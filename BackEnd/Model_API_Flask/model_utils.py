from transformers import AutoTokenizer, AutoModel
from joblib import load
from torch import nn, device, load, no_grad



MAX_LEN = 256
d = device('cpu')

# loading models & tokenizer
arabert_tokenizer = AutoTokenizer.from_pretrained("./AraBERTv2/tokenizers-bert-base-arabertv2")

class BERTClass(nn.Module):
    def __init__(self):
        super(BERTClass, self).__init__()
        self.bert_model = AutoModel.from_pretrained("./AraBERTv2/Fine_tuned-BERT-m01-256-Unbalanced", return_dict=True)
        self.dropout = nn.Dropout(0.1)
        self.linear = nn.Linear(768, 8)
        self.soft = nn.Softmax(dim=1)

    def forward(self, input_ids, attention_mask, token_type_ids):
        output = self.bert_model(input_ids, attention_mask, token_type_ids)
        output = self.dropout(output["pooler_output"])
        output = self.linear(output)
        output = self.soft(output)
        return output

model = BERTClass()
model.load_state_dict(load('./Trained_model/new_model_m01_256_Unbalanced.pth', map_location=d, weights_only=True))

# emmbding the input text
def tokenizer(text):
  output = arabert_tokenizer.encode_plus(text,
                                  None,
                                  add_special_tokens=True,
                                  max_length=MAX_LEN,
                                  padding="max_length",
                                  truncation=True,
                                  return_attention_mask=True,
                                  return_tensors="pt"
                                  )
  return output

def get_prediction(text):
    tokenz = tokenizer(text)
    model.eval()
    with no_grad():
        pred_tensor = model(input_ids=tokenz["input_ids"],
                            attention_mask=tokenz["attention_mask"],
                            token_type_ids=tokenz["token_type_ids"]
                            )
        pred_vec = pred_tensor.numpy()
    return pred_vec

def get_review_label(vec):
    deceptive_sum = sum(vec[0][:4])
    truthful_sum = sum(vec[0][4:])

    if deceptive_sum > truthful_sum:
        return 'Deceptive'
    else:
        return 'Truthful'
