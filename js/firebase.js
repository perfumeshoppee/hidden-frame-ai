// 1) Вставь сюда настройки Web App из Firebase Console → Project settings → Your apps.
// 2) В Firestore создай коллекцию "votes". Код сам создаст документы future / school / house.
// 3) Для старта можно использовать правила, описанные в README. Перед рекламным трафиком лучше включить App Check.

const firebaseConfig = {
  apiKey: "PASTE_API_KEY",
  authDomain: "PASTE_PROJECT.firebaseapp.com",
  projectId: "PASTE_PROJECT_ID",
  storageBucket: "PASTE_PROJECT.firebasestorage.app",
  messagingSenderId: "PASTE_SENDER_ID",
  appId: "PASTE_APP_ID"
};

const buttons = [...document.querySelectorAll(".vote-card")];
const message = document.querySelector("#vote-message");
const configured = !Object.values(firebaseConfig).some(v => String(v).startsWith("PASTE_"));

if (!configured) {
  buttons.forEach(btn => btn.addEventListener("click", () => {
    message.textContent = "Firebase ещё не подключён — вставь конфиг в js/firebase.js.";
  }));
} else {
  const [{ initializeApp }, firestore] = await Promise.all([
    import("https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js"),
    import("https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js")
  ]);
  const { getFirestore, doc, getDoc, setDoc, increment, collection, getDocs } = firestore;
  const db = getFirestore(initializeApp(firebaseConfig));

  async function refresh() {
    const snap = await getDocs(collection(db, "votes"));
    const counts = { future:0, school:0, house:0 };
    snap.forEach(d => counts[d.id] = d.data().count || 0);
    const total = Object.values(counts).reduce((a,b)=>a+b,0);
    for (const [id,count] of Object.entries(counts)) {
      const el = document.querySelector(`#result-${id}`);
      if (el) el.textContent = total ? `${Math.round(count/total*100)}% · ${count}` : "Голосовать";
    }
  }

  buttons.forEach(btn => btn.addEventListener("click", async () => {
    if (localStorage.getItem("hiddenframe-voted")) {
      message.textContent = "Ты уже голосовал с этого устройства ❤️";
      return;
    }
    const id = btn.dataset.vote;
    try {
      await setDoc(doc(db, "votes", id), { count: increment(1) }, { merge:true });
      localStorage.setItem("hiddenframe-voted", id);
      message.textContent = "Голос принят ❤️";
      await refresh();
    } catch (e) {
      console.error(e);
      message.textContent = "Не получилось сохранить голос. Проверь Firebase.";
    }
  }));
  refresh();
}