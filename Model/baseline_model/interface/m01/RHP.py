from baseline_model.functions.resource_m01 import *

model = BERTClass()
model.to(device)

optimizer = optimizer(model.parameters(), lr=LEARNING_RATE)
exe_seq = ['R', 'H', 'P']
pipeline(model, optimizer, train_model, test_model, exe_seq)
