HIDDEN FRAME AI — ГОТОВЫЙ САЙТ

1. Файлы
   index.html              — главная
   stories/index.html      — каталог историй
   stories/story.html      — страница чтения
   js/stories.js           — тексты историй
   js/story.js             — вывод выбранной истории
   js/firebase.js          — голосование
   css/style.css           — весь дизайн

2. Картинки
Положи в assets/:
   logo.png
   anya-max.jpg
   lera-danya.jpg
   school.jpg
   future-series.jpg
   social-preview.jpg
   story-message.jpg
   story-window.jpg
   story-online.jpg

Если картинка пока отсутствует, сайт всё равно откроется, просто будет пустое место/битая картинка.

3. Firebase
Открой js/firebase.js и замени PASTE_... на настройки Firebase Web App.
Нужна Firestore Database.

Пример базовых правил Firestore для теста:
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /votes/{voteId} {
      allow read: if true;
      allow create, update: if true;
      allow delete: if false;
    }
  }
}

ВАЖНО: эти правила подходят только для быстрого запуска. Перед большим Facebook-трафиком лучше
включить Firebase App Check / Cloud Functions или другую серверную защиту от накрутки.

4. Как добавлять новые истории
Открой js/stories.js и добавь новый объект.
В stories/index.html добавь карточку со ссылкой:
story.html?id=ID_ИСТОРИИ

5. Реклама
На главной рекламы нет.
Внутри story.html/js/story.js есть блок .ad-slot — туда позже вставляется рекламный код.
Сейчас это безопасный placeholder, чтобы верстка уже была готова.

6. Соцсети
TikTok: @hidden.frame.ai
Instagram: @hidden.frame.ai
YouTube: @hidden.frameai
Facebook: Hidden Frame AI
Donatello: hiddenframeai
