# Savanna Grill

Savanna Grill is a responsive restaurant website inspired by East African food and hospitality. I built it with HTML, CSS, and vanilla JavaScript, with layouts for phones, tablets, and desktops.

## What’s included

- A rotating hero banner and mobile-friendly navigation
- Restaurant, menu, events, and contact sections
- Scroll and hover animations
- A reservation form that opens an email draft with the submitted details
- A newsletter form with client-side feedback
- Responsive styling and semantic HTML

The forms are front-end demonstrations: reservations are not stored in a database, and newsletter signups are not sent to a mailing service.

## Run locally

There is no build step or package installation required. From the project directory, start a local server:

```bash
python -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000) in your browser. You can also open `index.html` directly, though a local server is recommended.

## Deploy

This is a static site and can be deployed on Vercel without a build command:

1. Import the repository into Vercel.
2. Select **Other** as the framework preset if prompted.
3. Leave the build command empty and use `.` as the output directory.
4. Deploy the project.

## Project files

- `index.html` — page content and structure
- `assets/css/style.css` — layout, colors, and responsive styles
- `assets/js/script.js` — navigation, slider, animation, and form behavior
- `assets/images/` — logos, photography, and decorative assets

## Author

Brian Obonyo  
[LinkedIn](https://www.linkedin.com/in/brianobonyo/) · [Portfolio](https://brianobonyo.dev)  
[brianprofocus@gmail.com](mailto:brianprofocus@gmail.com)
