# Glow Beauty — MEAN Stack Project

Personalized Beauty & Skincare E-commerce Platform, built on **M**ongoDB, **E**xpress, **A**ngular, **N**ode.js.

Your original static design (colors, layout, fonts, all your custom CSS) has been preserved.
What changed: the product listing and contact form now pull from / post to a real database
through a REST API, and the site runs as an Angular app instead of separate `.html` files —
which is what turns it into an actual MEAN stack project instead of a static one.

## Folder structure

```
glow-beauty-mean/
├── backend/              # Node + Express + MongoDB (Mongoose)
│   ├── config/db.js
│   ├── models/           # Product.js, Contact.js
│   ├── controllers/      # productController.js, contactController.js
│   ├── routes/           # products.js, contact.js
│   ├── seed/seedProducts.js   # loads your 12 real products into MongoDB
│   ├── server.js
│   └── package.json
└── frontend/             # Angular 17 (standalone components)
    ├── src/app/pages/    # home, about, products, contact, faq
    ├── src/app/components/  # navbar, footer
    ├── src/app/services/    # product.service.ts, contact.service.ts (HTTP calls)
    ├── src/styles.css    # your original CSS, unchanged
    └── package.json
```

## 1. Backend setup

```bash
cd backend
npm install
cp .env.example .env        # edit MONGO_URI if needed
npm run seed                # loads your 12 products into MongoDB
npm run dev                 # starts on http://localhost:5000
```

You need MongoDB running locally (`mongod`) or a free MongoDB Atlas connection string
in `.env`.

API endpoints:
| Method | Route | Purpose |
|---|---|---|
| GET | /api/products | list all products (supports `?category=`) |
| GET | /api/products/:id | one product |
| POST | /api/products | create product |
| PUT | /api/products/:id | update product |
| DELETE | /api/products/:id | delete product |
| POST | /api/contact | submit contact form |
| GET | /api/contact | list submitted messages |

## 2. Frontend setup

```bash
cd frontend
npm install
npm start          # ng serve, opens http://localhost:4200
```

Make sure the backend (step 1) is running first — the Products and Contact pages
call it directly.

## 3. Add your real image assets

Copy your existing `assets/images/*` files (girl.jpg, kit.jpg, logo.png, etc.) into
`frontend/src/assets/images/`. They weren't included in this generation since only your
code was shared, not the image binaries.

## What's new in this version

- **View Product** now opens a real product detail page (`/products/:id`)
- **Begin** (Home) and **Join Us** (About) buttons now navigate to Products/Contact
- **FAQ search** actually filters the question list
- **Category filter** on the Products page (Makeup / Skincare / Hair Care / Body Care)
- **Featured Products + Testimonials + Why Choose Us** sections added to Home
- **New `/admin` page** — lets you add and delete products through the UI, which is
  what actually demonstrates your Create/Delete API routes working, not just sitting
  unused in the backend code

## Why this satisfies a MEAN stack submission

- **MongoDB** — Product and Contact data live in real MongoDB collections via Mongoose
  schemas (`backend/models/`), not hardcoded HTML.
- **Express** — `backend/server.js` + `routes/` + `controllers/` expose a REST API with
  full CRUD for products and contact-message storage.
- **Angular** — `frontend/` is a genuine Angular application (standalone components,
  routing via `app.routes.ts`, `HttpClient` services, reactive forms) — not plain HTML/JS.
- **Node.js** — the whole backend runs on Node via Express.

## Submission checklist

- [ ] Run `npm install` in both `backend/` and `frontend/`
- [ ] Have MongoDB running (local or Atlas) and run `npm run seed`
- [ ] Confirm `npm run dev` (backend) and `npm start` (frontend) both work together
- [ ] Copy your image assets into `frontend/src/assets/images/`
- [ ] (Optional, but strengthens the "database-driven" story) Add a couple more product
      fields you actually use — e.g. stock count shown on the product card — since the
      schema already supports it
- [ ] Zip or push the whole `glow-beauty-mean/` folder for submission, or deploy backend
      (Render/Railway) + frontend (Netlify/Vercel) and submit live links
