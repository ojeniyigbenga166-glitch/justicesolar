const fs = require('fs');
const file = 'src/style.css';
let css = fs.readFileSync(file, 'utf8');

// 1. Replace variables
css = css.replace(/--color-primary:\s*#[a-fA-F0-9]+;.*$/m, '--color-primary:    #FDB813;   /* Primary Yellow */');
css = css.replace(/--color-primary-dark:\s*#[a-fA-F0-9]+;.*$/m, '--color-primary-dark: #e5a40a;');
css = css.replace(/--color-accent:\s*#[a-fA-F0-9]+;.*$/m, '--color-accent:     #22C55E;   /* Eco Green */');
css = css.replace(/--color-dark:\s*#[a-fA-F0-9]+;.*$/m, '--color-dark:       #071B3B;   /* Dark Navy */');
css = css.replace(/--color-dark-2:\s*#[a-fA-F0-9]+;.*$/m, '--color-dark-2:     #102B5C;   /* Secondary Blue */');
css = css.replace(/--color-dark-card:\s*rgba.*?;/m, '--color-dark-card:  rgba(7, 27, 59, 0.88);');
css = css.replace(/--color-white:\s*#[a-fA-F0-9]+;.*$/m, '--color-white:      #ffffff;');
css = css.replace(/--color-light:\s*#[a-fA-F0-9]+;.*$/m, '--color-light:      #F8FAFC;');
css = css.replace(/--color-muted:\s*rgba.*?;/m, '--color-muted:      rgba(255,255,255,0.65);');

// Add new variables for text colors inside :root
css = css.replace(/(--font-heading:\s*'Outfit',\s*sans-serif;)/, `--color-text-main:  #475569;\n  --color-text-heading: #071B3B;\n  --color-border:     #CBD5E1;\n  $1`);

// Replace body colors
css = css.replace(/background: var\(--color-dark\);\n\s*color: var\(--color-white\);/m, `background: var(--color-light);\n  color: var(--color-text-main);`);

// Update section backgrounds and text colors
// SERVICES SECTION
css = css.replace(/\.services \{\s*padding: 6rem 5%;\s*background: var\(--color-dark-2\);/m, `.services {\n  padding: 6rem 5%;\n  background: var(--color-light);`);

// .service-card
css = css.replace(/\.service-card \{\s*background: var\(--color-dark-card\);\s*border: 1px solid rgba\(255, 255, 255, 0\.05\);/m, `.service-card {\n  background: var(--color-white);\n  border: 1px solid var(--color-border);`);

// .service-card::before
css = css.replace(/rgba\(245, 197, 24, 0\.05\)/g, `rgba(253, 184, 19, 0.05)`);

// .service-card:hover border
css = css.replace(/border-color: rgba\(245, 197, 24, 0\.3\);/m, `border-color: var(--color-primary);`);
// .service-card:hover shadow
css = css.replace(/box-shadow: 0 15px 40px rgba\(0, 0, 0, 0\.4\);/m, `box-shadow: 0 15px 40px rgba(0, 0, 0, 0.05);`);

// .service-card__icon
css = css.replace(/\.service-card__icon \{\s*width: 60px;\s*height: 60px;\s*border-radius: 12px;\s*background: rgba\(245, 197, 24, 0\.1\);/m, `.service-card__icon {\n  width: 60px;\n  height: 60px;\n  border-radius: 12px;\n  background: rgba(253, 184, 19, 0.1);`);

// HOW IT WORKS SECTION
css = css.replace(/\.how-it-works \{\s*padding: 6rem 5%;\s*background: var\(--color-dark\);\s*position: relative;/m, `.how-it-works {\n  padding: 6rem 5%;\n  background: var(--color-white);\n  position: relative;\n  border-top: 1px solid var(--color-border);`);

// .hiw__icon-wrap
css = css.replace(/\.hiw__icon-wrap \{\s*width: 80px;\s*height: 80px;\s*border-radius: 50%;\s*background: var\(--color-dark-2\);/m, `.hiw__icon-wrap {\n  width: 80px;\n  height: 80px;\n  border-radius: 50%;\n  background: var(--color-light);`);

// .hiw__step:hover .hiw__icon-wrap (specifically the color)
css = css.replace(/\.hiw__step:hover \.hiw__icon-wrap \{\s*transform: translateY\(-5px\);\s*box-shadow: 0 10px 20px rgba\(46, 204, 113, 0\.2\);\s*background: var\(--color-accent\);\s*color: var\(--color-dark\);/m, `.hiw__step:hover .hiw__icon-wrap {\n  transform: translateY(-5px);\n  box-shadow: 0 10px 20px rgba(34, 197, 94, 0.2);\n  background: var(--color-accent);\n  color: var(--color-white);`);

// .hiw__badge
css = css.replace(/border: 3px solid var\(--color-dark-2\);/g, `border: 3px solid var(--color-white);`);

// CALCULATOR SECTION background 
css = css.replace(/\.calculator \{\s*padding: 8rem 5%;\s*background: var\(--color-dark-2\);/m, `.calculator {\n  padding: 8rem 5%;\n  background: var(--color-dark);`);

// Update section headers
css = css.replace(/\.section-title \{\s*font-family: var\(--font-heading\);\s*font-size: clamp\(2rem, 3vw, 2\.8rem\);\s*font-weight: 800;\s*color: var\(--color-white\);/m, `.section-title {\n  font-family: var(--font-heading);\n  font-size: clamp(2rem, 3vw, 2.8rem);\n  font-weight: 800;\n  color: var(--color-text-heading);`);

css = css.replace(/\.service-card__title \{\s*font-family: var\(--font-heading\);\s*font-size: 1\.25rem;\s*font-weight: 700;\s*color: var\(--color-white\);/m, `.service-card__title {\n  font-family: var(--font-heading);\n  font-size: 1.25rem;\n  font-weight: 700;\n  color: var(--color-text-heading);`);

css = css.replace(/\.service-card__desc \{\s*font-size: 0\.9rem;\s*color: var\(--color-muted\);/m, `.service-card__desc {\n  font-size: 0.9rem;\n  color: var(--color-text-main);`);

css = css.replace(/\.hiw__title \{\s*font-family: var\(--font-heading\);\s*font-size: 2\.2rem;\s*font-weight: 800;\s*color: var\(--color-white\);/m, `.hiw__title {\n  font-family: var(--font-heading);\n  font-size: 2.2rem;\n  font-weight: 800;\n  color: var(--color-text-heading);`);

css = css.replace(/\.hiw__step-title \{\s*font-family: var\(--font-heading\);\s*font-size: 1\.05rem;\s*font-weight: 700;\s*color: var\(--color-white\);/m, `.hiw__step-title {\n  font-family: var(--font-heading);\n  font-size: 1.05rem;\n  font-weight: 700;\n  color: var(--color-text-heading);`);

css = css.replace(/\.hiw__desc \{\s*font-size: 0\.95rem;\s*color: var\(--color-muted\);/m, `.hiw__desc {\n  font-size: 0.95rem;\n  color: var(--color-text-main);`);

css = css.replace(/\.hiw__step-desc \{\s*font-size: 0\.85rem;\s*color: var\(--color-muted\);/m, `.hiw__step-desc {\n  font-size: 0.85rem;\n  color: var(--color-text-main);`);

css = css.replace(/\.service-card__link \{\s*display: inline-flex;\s*align-items: center;\s*gap: 8px;\s*color: var\(--color-primary\);/m, `.service-card__link {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  color: var(--color-dark-2);`);

// Fix navbar colors
css = css.replace(/rgba\(11,\s*26,\s*14,\s*0\.55\)/g, `rgba(7, 27, 59, 0.85)`);
css = css.replace(/rgba\(11,\s*26,\s*14,\s*0\.97\)/g, `rgba(7, 27, 59, 0.98)`);
css = css.replace(/rgba\(11,\s*26,\s*14,\s*0\.98\)/g, `rgba(7, 27, 59, 0.98)`);

// Ensure hero text is explicit since body is now dark text
css = css.replace(/\.hero__subtext \{\s*font-size: clamp\(1rem, 1\.5vw, 1\.1rem\);\s*color: rgba\(255,255,255,0\.8\);\s*max-width: 600px;\s*margin-bottom: 2\.5rem;\s*line-height: 1\.6;\s*\}/m, `.hero__subtext {\n  font-size: clamp(1rem, 1.5vw, 1.1rem);\n  color: rgba(255,255,255,0.8);\n  max-width: 600px;\n  margin-bottom: 2.5rem;\n  line-height: 1.6;\n}`);
css = css.replace(/\.hero__stat-item \{\s*flex: 1;\s*padding: 24px 30px;\s*background: rgba\(11, 26, 14, 0\.7\);/m, `.hero__stat-item {\n  flex: 1;\n  padding: 24px 30px;\n  background: rgba(7, 27, 59, 0.85);`);
css = css.replace(/\.hero__stat-item \{\s*flex: 1;\s*padding: 24px 30px;\s*background: rgba\(7, 27, 59, 0\.85\);\s*backdrop-filter: blur\(12px\);\s*-webkit-backdrop-filter: blur\(12px\);\s*border-top: 2px solid var\(--color-primary\);\s*border-right: 1px solid rgba\(255, 255, 255, 0\.08\);\s*display: flex;\s*flex-direction: column;\s*gap: 5px;\s*\}/m, `.hero__stat-item {\n  flex: 1;\n  padding: 24px 30px;\n  background: rgba(7, 27, 59, 0.85);\n  backdrop-filter: blur(12px);\n  -webkit-backdrop-filter: blur(12px);\n  border-top: 2px solid var(--color-primary);\n  border-right: 1px solid rgba(255, 255, 255, 0.08);\n  display: flex;\n  flex-direction: column;\n  gap: 5px;\n  color: var(--color-white);\n}`);

fs.writeFileSync(file, css);
console.log("Replaced CSS completely!");
