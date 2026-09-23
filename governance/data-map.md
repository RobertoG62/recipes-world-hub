# Data Map — recipes-world-hub

> נוצר 29.08.2026 · לפי `web-security-compliance.md` §5, §8 · אתר **דו-לשוני** (EN/HE)

## נכסים
| | |
|---|---|
| כתובת | https://robertog62.github.io/recipes-world-hub/ |
| ריפו | `RobertoG62/recipes-world-hub` |
| אחסון | GitHub Pages |
| עמודים | `index.html` + `privacy.html` · `terms.html` · `accessibility.html` |
| שפות | אנגלית (ברירת מחדל) + עברית, החלפה דרך `data-en`/`data-he` |

## נקודות איסוף מידע
| נקודה | קיימת? |
|---|---|
| טפסים / שדות קלט | ❌ אין |
| הרשמה / חשבונות | ❌ אין |
| Cookies | ❌ אין |
| אנליטיקס / פיקסלים | ❌ אין |
| **localStorage** | ✅ **כן — מפתח אחד** (ראה למטה) |

### localStorage — הפריט היחיד
| שדה | ערך |
|---|---|
| מפתח | `wrh-lang` |
| ערך | `'en'` או `'he'` בלבד |
| מטרה | לזכור את בחירת השפה של הקורא בין עמודים |
| סיווג | **הכרחי / העדפה** — לא מידע אישי, לא מזהה |
| נשלח לשרת? | לא. לעולם לא עוזב את הדפדפן |
| **נוסף על ידינו ב-29.08.2026** | כן — בכוונה. בלעדיו קורא שעבר לעברית היה מגיע לדף מדיניות באנגלית. **מדיניות פרטיות שהקורא לא יכול לקרוא אינה מדיניות** |
| מתועד? | ✅ במפורש ב-`privacy.html`, בשתי השפות |

## עיבוד על ידי צדדים שלישיים
| גורם | תפקיד | מה מעובד |
|---|---|---|
| GitHub, Inc. | אחסון | לוגי שרת (IP, User-Agent, מועד). אין לנו גישה |

## משאבי צד שלישי נטענים
**אפס.** (29.08.2026)

לפני התיקון נטענו: `cdn.tailwindcss.com`, `fonts.googleapis.com`, `cdnjs.cloudflare.com` (Font Awesome), **ו-`images.unsplash.com` מתוך ה-CSS** — האחרון היה החמקמק ביותר, כי סריקת `src=`/`href=` ב-HTML אינה תופסת `url()` בגיליון סגנון.

הוחלפו ב:
* `assets/fonts/` — 23 קובצי woff2 (Playfair Display + Heebo, כולל **subset עברי**)
* `assets/css/tailwind.css` — 18KB בנוי מקומית
* `assets/vendor/fontawesome/` — CSS + 4 webfonts
* `images/hero-kitchen.jpg` — תמונת ה-hero, הורדה מ-Unsplash (רישיון Unsplash מתיר)

**אומת:** רינדור מלא ותקין כאשר כל הדומיינים החיצוניים מוכתבים ל-`0.0.0.0`.

## קישורים יוצאים
שבעה-עשר אתרי מתכונים, 34 קישורים בסך הכול (כרטיס + פוטר לכל אחד), כולם תחת `robertog62.github.io`. **לכולם `rel="noopener noreferrer"`** — נבדק 21.09.2026: 0 קישורים יוצאים בלי התכונה. קודם היה `target="_blank"` בלי rel, מה שמאפשר reverse tabnabbing.
