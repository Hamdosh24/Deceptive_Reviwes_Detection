# Baseline in package like
## ملخص
نقوم في هذا المجلد باعادة كتابة شيفرة نماذج ال Baseline على شكل حزمة بايثون لتسهيل الاستخدام والتعديل

## طريقة الاستخدام
عليك اولا تعديل مسار البيانات ومسار ال Tokenizer ونموذج ال BERT في ملف ال Prepare.
لدينا خيارين اما تدريب نموذج او استعال نموذج مدرب بشكل مسبق:
1.في حال تدريب نموذج نقوم بتحميل الهيكلية والتدريب المطلوب من خلال ملفات ال interfaces مثل m01 للهيكلية الاولى و HPR للتدريب على بيانات الفنادق ثم بيانات الفنادق مع المنتجات ثم بينات الفنادق والمنتجات والمطاعم. 
 ***********for training a model*************
from baseline_model.interface.m01.HRP import *

2.في حال تحميل نموذج مدرب مسبقا نقوم اولا بتحميل ملف load للهيكلية الموجودة في النموذج المدربمسبقا ثم نحدد مسار ال المكان الملف الذي يحوي ال state_dict الخاصة بالنموذج المدرب مسبقا.

 *********OR for loading a model**********
from baseline_model.functions.load_m01 import *

check_point_path = 'E:/Pycharm_Projects/baseline_model/interface/m01/H_curr_ck.pt'
model, _, _ = load_ckp(check_point_path, model, optimizer)
في حال تصنيق نص نقوم بتحميل ملف ال classifier الذي يحوي التابع الذي يقوم بالتصنيف.

 *********OR for loading a model**********
from baseline_model.functions.classifier import classifier

text = 'النص المراد اختباره'
res = classifier(model=model, text=text)
print(res)
