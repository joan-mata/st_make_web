# Guia de Desenvolupament Web

Guia de referència estàtica per a estudiants de l'assignatura **Serveis de Telecomunicacions** del **Grau en Sistemes de Telecomunicacions** (UAB).

**Prof. Joan Mata**

---

## Com usar-la

Obre `index.html` al navegador. No necessita servidor — funciona directament des del sistema de fitxers.

Per pujar-la a un servidor i que els alumnes hi accedeixin des de la web, copia tots els fitxers mantenint l'estructura de carpetes.

---

## Contingut

| Secció | Descripció |
|---|---|
| **HTML** | Estructura bàsica, etiquetes, formularis, HTML semàntic, `index.html` com a punt d'entrada |
| **CSS** | Selectores, box model, Flexbox, variables CSS, responsive |
| **JavaScript** | DOM, events, Fetch API, `async/await` |
| **PHP** | Sintaxi, arrays, superglobals, `include`/`require`, quan passar de `.html` a `.php` |
| **MVC** | Arquitectura Model-View-Controller amb exemple complet |
| **Base de Dades** | PostgreSQL, SQL, PDO, CRUD, relacions entre taules, `.env` |
| **UML / ER** | Diagrames Entitat-Relació, eines (draw.io, dbdiagram.io) |
| **DevTools** | Inspector d'elements, consola, xarxa, trucs del navegador |
| **Seguretat** | SQL Injection, XSS, hashing de contrasenyes, variables d'entorn |
| **Bones Pràctiques** | DRY, noms descriptius, estructura de fitxers, control de versions |

---

## Estructura de fitxers

```
index.html
css/
  styles.css
js/
  nav.js
pages/
  html.html
  css.html
  javascript.html
  php.html
  mvc.html
  postgresql.html
  uml-db.html
  devtools.html
  seguridad.html
  buenas-practicas.html
```

---

## Entorn de la pràctica

- **Servidor**: UAB (Apache + PHP + PostgreSQL ja configurats)
- **Accés al codi**: VS Code amb extensió **Remote - SSH**
- **Accés a la BD**: VS Code amb extensió **Database Client JDBC**
- **Alternativa SSH**: MobaXTerm (Windows) o terminal

---

*Recursos externs recomanats: [W3Schools](https://w3schools.com) · [MDN Web Docs](https://developer.mozilla.org) · [CSS-Tricks](https://css-tricks.com)*
