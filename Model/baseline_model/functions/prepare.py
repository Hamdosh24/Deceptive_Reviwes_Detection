from torch.cuda import is_available
from torch import device
from transformers import AutoTokenizer


# data path
data_paths = {"H": 'path/to/data/folder/AFRD/All_Dataset/Hotel.xlsx',
              "R": 'path/to/data/folder/AFRD/All_Dataset/Restaurant.xlsx',
              "P": 'path/to/data/folder/AFRD/All_Dataset/Product.xlsx'}

target_list = ['Fake', 'Truthful']

# tokenizer
tokenizer_path = "BERT tokenizer path"
b_tokenizer = AutoTokenizer.from_pretrained(tokenizer_path)

# AraBERT model path
b_model_path = "BERT model path"

# HP
MAX_LEN = 265
TRAIN_BATCH_SIZE = 16
VALID_BATCH_SIZE = 16
EPOCHS = 1
LEARNING_RATE = 2.5e-05
device = device('cuda') if is_available() else device('cpu')
