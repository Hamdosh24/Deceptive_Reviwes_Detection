from baseline_model.functions.prepare import *
from torch import long


def classifier(model, text):
    model.eval()
    inputs = b_tokenizer.encode_plus(text,
                                     None,
                                     add_special_tokens=True,
                                     max_length=MAX_LEN,
                                     padding="max_length",
                                     truncation=True,
                                     return_attention_mask=True,
                                     return_tensors="pt"
                                     )

    inputs = {"input_ids": inputs["input_ids"],
              "attention_mask": inputs["attention_mask"],
              "token_type_ids": inputs["token_type_ids"]}


    input_ids = inputs["input_ids"].to(device, dtype=long)
    attention_mask = inputs['attention_mask'].to(device, dtype=long)
    token_type_ids = inputs['token_type_ids'].to(device, dtype=long)

    # forward pass
    output = model(input_ids, attention_mask, token_type_ids)

    return output
