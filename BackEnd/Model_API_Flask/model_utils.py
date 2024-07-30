from transformers import AutoTokenizer, AutoModel
from joblib import load


MAX_LEN = 256

# loading models & tokenizer
arabert_tokenizer = AutoTokenizer.from_pretrained("./AraBERTv2/tokenizers-bert-base-arabertv2")
arabert_model = AutoModel.from_pretrained("./AraBERTv2/model-bert-base-arabertv2-finetuned", return_dict=True)
lr_cls = load("./Trained_model/lr_cls.pkl")


# emmbding the input text
def emmbding(text):
  input = arabert_tokenizer.encode_plus(text,
                                  None,
                                  add_special_tokens=True,
                                  max_length=MAX_LEN,
                                  padding="max_length",
                                  truncation=True,
                                  return_attention_mask=True,
                                  return_tensors="pt"
                                  )

  output = arabert_model(input_ids=input["input_ids"],
                   attention_mask=input["attention_mask"],
                   token_type_ids=input["token_type_ids"]
                   ).pooler_output.detach().numpy()

  return output


def get_prediction(text):
    embd_text = emmbding(text)
    pred_value = lr_cls.predict(embd_text).item()

    if pred_value == 1:
        return 'deceptive'
    elif pred_value == 0:
        return 'truthful'
    else:
        raise 'Error, Model wrong output'
