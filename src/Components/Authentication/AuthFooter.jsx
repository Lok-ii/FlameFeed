
const AuthFooter = () => {
  return (
    <div className="authFooter text-xs flex items-center justify-center gap-x-8 gap-y-2 w-[80%] flex-wrap ">
      <p href="" className="hover:underline">Meta</p>
      <p href="" className="hover:underline">About</p>
      <p href="" className="hover:underline">Blog</p>
      <p href="" className="hover:underline">Jobs</p>
      <p href="" className="hover:underline">Help</p>
      <p href="" className="hover:underline">API</p>
      <p href="" className="hover:underline">Privacy</p>
      <p href="" className="hover:underline">Terms</p>
      <p href="" className="hover:underline">Locations</p>
      <p href="" className="hover:underline">Instagram Lite</p>
      <p href="" className="hover:underline">Threads</p>
      <p href="" className="hover:underline">Contact uploading and non-users</p>
      <p href="" className="hover:underline">Meta Verified</p>
      <select name="language" defaultValue="en-gb" id="language" className="w-[6rem]">
        <option value="ar">العربية</option>
        <option value="af">Afrikaans</option>
        <option value="cs">Čeština</option>
        <option value="da">Dansk</option>
        <option value="de">Deutsch</option>
        <option value="el">Ελληνικά</option>
        <option value="en">English</option>
        <option value="en-gb">English (UK)</option>
        <option value="es">Español (España)</option>
        <option value="es-la">Español</option>
        <option value="fa">فارسی</option>
        <option value="fi">Suomi</option>
        <option value="fr">Français</option>
        <option value="he">עברית</option>
        <option value="id">Bahasa Indonesia</option>
        <option value="it">Italiano</option>
        <option value="ja">日本語</option>
        <option value="ko">한국어</option>
        <option value="ms">Bahasa Melayu</option>
        <option value="nb">Norsk</option>
        <option value="nl">Nederlands</option>
        <option value="pl">Polski</option>
        <option value="pt-br">Português (Brasil)</option>
        <option value="pt">Português (Portugal)</option>
        <option value="ru">Русский</option>
        <option value="sv">Svenska</option>
        <option value="th">ภาษาไทย</option>
        <option value="tl">Filipino</option>
        <option value="tr">Türkçe</option>
        <option value="zh-cn">中文(简体)</option>
        <option value="zh-tw">中文(台灣)</option>
        <option value="bn">বাংলা</option>
        <option value="gu">ગુજરાતી</option>
        <option value="hi">हिन्दी</option>
        <option value="hr">Hrvatski</option>
        <option value="hu">Magyar</option>
        <option value="kn">ಕನ್ನಡ</option>
        <option value="ml">മലയാളം</option>
        <option value="mr">मराठी</option>
        <option value="ne">नेपाली</option>
        <option value="pa">ਪੰਜਾਬੀ</option>
        <option value="si">සිංහල</option>
        <option value="sk">Slovenčina</option>
        <option value="ta">தமிழ்</option>
        <option value="te">తెలుగు</option>
        <option value="ur">اردو</option>
        <option value="vi">Tiếng Việt</option>
        <option value="zh-hk">中文(香港)</option>
        <option value="bg">Български</option>
        <option value="fr-ca">Français (Canada)</option>
        <option value="ro">Română</option>
        <option value="sr">Српски</option>
        <option value="uk">Українська</option>
      </select>

      <p className="copyright">© 2024 Instagram from Meta</p>
    </div>
  );
};

export default AuthFooter;
