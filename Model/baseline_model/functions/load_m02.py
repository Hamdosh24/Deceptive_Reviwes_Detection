from baseline_model.functions.prepare import LEARNING_RATE, device
from baseline_model.functions.model_m02 import *
from baseline_model.functions.optimizer import *
from baseline_model.functions.save_load import load_ckp


model = BERTClass()
model.to(device)
optimizer = optimizer(model.parameters(), LEARNING_RATE)
