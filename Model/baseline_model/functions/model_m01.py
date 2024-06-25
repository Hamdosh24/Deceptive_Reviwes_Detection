from torch import nn
from transformers import AutoModel
from baseline_model.functions.prepare import b_model_path


class BERTClass(nn.Module):
    def __init__(self):
        super(BERTClass, self).__init__()
        self.bert_model = AutoModel.from_pretrained(b_model_path, return_dict=True)
        self.dropout = nn.Dropout(0.1)
        self.linear = nn.Linear(768, 2)

    def forward(self, input_ids, attention_mask, token_type_ids):
        output = self.bert_model(input_ids, attention_mask, token_type_ids)
        output_dropout = self.dropout(output["pooler_output"])
        output = self.linear(output_dropout)
        return output
