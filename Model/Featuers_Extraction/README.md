# Featuers Extraction

كما هو معلوم في مسائل التصنيف عادة يتم استخدام النماذج مسبقة التدريب بطريقتين اما اجراء عملية tuned-Fine للنموذج واستعماله مثل ما تم تطبيقه عند تطوير ال Baseline او استخدامه للقيام ب Extraction Features واستخدام رأس تصنيف )نماذج تعلم آلي او شبكات عصبونية( للقيام بعملية التصنيف.


# البيانات
تم استخدام مجموعة بيانات AFRD لتدريب واختبار الانموذج، حيث تم تقسيم البيانات الى بينات تدريب واختبار بنسبة 20/80‘ كما تم ارفاق البيانات بعد القيام ب emmbding لتوفير بعض الوقت.

# النماذج المستخدمة للتصنيف
1. 2-Layer NN
2. KNN Classifier
3. Decision Tree Classifier
4. Extra Tree Classifier
5. Random Forest Classifier
6. Linear SVC -6
7. SVM Classifier
8. NuSVC
9. SGD Classifier
10. Logistic Regression Classifier
11. Logistic Regression Classifier with CV
12. Gaussian Naïve Bayes Classifier

يمكن مراجعة التقرير المرفق لتافصيل اكثر.
