import numpy as np
from torch import long, sigmoid, no_grad
from sklearn.metrics import precision_score, recall_score, f1_score, \
    accuracy_score, confusion_matrix, ConfusionMatrixDisplay, classification_report
import matplotlib.pyplot as plt
from baseline_model.functions.prepare import MAX_LEN, device, target_list, b_tokenizer


def max_class(item):
    item = np.where(item == max(item), 1, 0)
    return item


def test_model(model, test_data):
    metrics_0 = {}
    metrics_1 = {}
    test_len = test_data.shape[0]
    text_test = test_data["Text"]
    targets_test = test_data[target_list].to_numpy().reshape(-1, 2)
    del test_data
    targets_pred = []

    model.eval()
    with no_grad():
        for review in text_test:
            review = str(review)
            emb = b_tokenizer.encode_plus(review,
                                          None,
                                          add_special_tokens=True,
                                          max_length=MAX_LEN,
                                          padding="max_length",
                                          truncation=True,
                                          return_attention_mask=True,
                                          return_tensors="pt"
                                          )

            input_ids = emb["input_ids"].to(device, dtype=long)
            attention_mask = emb['attention_mask'].to(device, dtype=long)
            token_type_ids = emb['token_type_ids'].to(device, dtype=long)

            res = model(input_ids, attention_mask, token_type_ids)
            final_res = sigmoid(res).cpu().detach().numpy()

            targets_pred.append(final_res)

    targets_pred = np.array(targets_pred).reshape(-1, 2)
    targets_pred = np.apply_along_axis(max_class, 1, targets_pred)

    metrics_0["accuracy_score"] = accuracy_score(targets_test[:, 0], targets_pred[:, 0])
    metrics_0["precision_score"] = precision_score(targets_test[:, 0], targets_pred[:, 0])
    metrics_0["recall_score"] = recall_score(targets_test[:, 0], targets_pred[:, 0])
    metrics_0["f1_score"] = f1_score(targets_test[:, 0], targets_pred[:, 0])

    metrics_1["accuracy_score"] = accuracy_score(targets_test[:, 1], targets_pred[:, 1])
    metrics_1["precision_score"] = precision_score(targets_test[:, 1], targets_pred[:, 1])
    metrics_1["recall_score"] = recall_score(targets_test[:, 1], targets_pred[:, 1])
    metrics_1["f1_score"] = f1_score(targets_test[:, 1], targets_pred[:, 1])

    confusion_matrix_res = confusion_matrix(targets_test[:, 0], targets_pred[:, 0])

    cm_display = ConfusionMatrixDisplay(
        confusion_matrix=confusion_matrix_res,
        display_labels=[0, 1])

    print(f"metrics_0: {metrics_0}\n metrics_1: {metrics_1}")
    print(classification_report(targets_test[:, 0], targets_pred[:, 0], target_names=['Truthful', 'Fake']))
    cm_display.plot()
    plt.show()
