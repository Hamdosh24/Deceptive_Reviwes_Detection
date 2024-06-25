from torch.optim import Adam


def optimizer(model_params, lr):
    return Adam(params=model_params, lr=lr)
