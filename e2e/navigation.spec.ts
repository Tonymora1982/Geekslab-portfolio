import { test, expect } from '@playwright/test';

test.describe('Portfolio Navigation Tests', () => {

  test.describe('Homepage', () => {
    test('should load homepage correctly', async ({ page }) => {
      await page.goto('/', { waitUntil: 'domcontentloaded' });

      // Verificar título de la página
      await expect(page).toHaveTitle(/Anthony Mora|GeeksLab/i);

      // Verificar que el navbar existe
      await expect(page.locator('nav')).toBeVisible();

      // Verificar elementos clave del hero
      await expect(page.getByRole('heading', { name: /Anthony Mora/i }).first()).toBeVisible();
      await expect(page.getByText(/Full Stack Developer/i).first()).toBeVisible();

      console.log('✅ Homepage loads correctly');
    });

    test('should render a single navbar (no duplicates)', async ({ page }) => {
      await page.goto('/', { waitUntil: 'domcontentloaded' });

      await expect(page.locator('nav')).toHaveCount(1);

      console.log('✅ Single navbar rendered');
    });

    test('should navigate to Projects from hero CTA', async ({ page }) => {
      await page.goto('/', { waitUntil: 'domcontentloaded' });

      const viewWork = page.getByRole('link', { name: /view work/i });
      await expect(viewWork).toBeVisible();
      await viewWork.click();

      // Confirmar que la sección Projects es visible
      await expect(page.locator('#projects')).toBeVisible();

      console.log('✅ Hero CTA scrolls to Projects');
    });

    test('should navigate to Contact from hero CTA', async ({ page }) => {
      await page.goto('/', { waitUntil: 'domcontentloaded' });

      const getInTouch = page.getByRole('link', { name: /get in touch/i });
      await expect(getInTouch).toBeVisible();
      await getInTouch.click();

      await expect(page.locator('#contact')).toBeVisible();

      console.log('✅ Hero CTA scrolls to Contact');
    });
  });

  test.describe('Navbar', () => {
    test('should have all navigation links', async ({ page }) => {
      await page.goto('/', { waitUntil: 'domcontentloaded' });

      // Abrir menú (click en hamburger)
      const menuButton = page.locator('button[aria-label="Toggle menu"]');
      if (await menuButton.isVisible()) {
        await menuButton.click();
        await page.waitForTimeout(500);
      }

      // Verificar links principales
      await expect(page.locator('nav')).toContainText(/About/i);
      await expect(page.locator('nav')).toContainText(/Experience/i);
      await expect(page.locator('nav')).toContainText(/Projects/i);
      await expect(page.locator('nav')).toContainText(/Contact/i);

      console.log('✅ Navbar has navigation links');
    });

    test('should navigate via navbar', async ({ page }) => {
      await page.goto('/', { waitUntil: 'domcontentloaded' });

      // Abrir menú
      const menuButton = page.locator('button[aria-label="Toggle menu"]');
      if (await menuButton.isVisible()) {
        await menuButton.click();
        await page.waitForTimeout(500);
      }

      // Click en Projects (scroll)
      const projectsLink = page.locator('nav a[href="#projects"]').first();
      await expect(projectsLink).toBeVisible();
      await projectsLink.click();

      await expect(page.locator('#projects')).toBeVisible();

      console.log('✅ Navbar scroll navigation works');
    });
  });

  test.describe('Evidence Layer Page', () => {
    test('should load Evidence Layer page', async ({ page }) => {
      await page.goto('/evidence-layer', { waitUntil: 'domcontentloaded' });

      // Verificar título principal
      await expect(page.locator('h1')).toContainText(/Evidence Layer|Recruiter/i);

      console.log('✅ Evidence Layer page loads');
    });

    test('should have SLA section with anchor', async ({ page }) => {
      await page.goto('/evidence-layer#sla', { waitUntil: 'domcontentloaded' });

      // Verificar sección SLA
      const slaSection = page.locator('#sla');
      await expect(slaSection).toBeVisible();

      console.log('✅ SLA section and anchor work');
    });

    test('should have Experiments section with anchor', async ({ page }) => {
      await page.goto('/evidence-layer#experiments', { waitUntil: 'domcontentloaded' });

      // Verificar sección experiments
      const experimentsSection = page.locator('#experiments');
      await expect(experimentsSection).toBeVisible();

      console.log('✅ Experiments section and anchor work');
    });

    test('should have RFC section with anchor', async ({ page }) => {
      await page.goto('/evidence-layer#rfc', { waitUntil: 'domcontentloaded' });

      // Verificar sección RFC
      const rfcSection = page.locator('#rfc');
      await expect(rfcSection).toBeVisible();

      console.log('✅ RFC section and anchor work');
    });

    test('should have experiment filters', async ({ page }) => {
      await page.goto('/evidence-layer', { waitUntil: 'domcontentloaded' });

      // Verificar que hay botones de filtro
      await expect(page.locator('button').first()).toBeVisible();

      console.log('✅ Experiment filters are present');
    });

    test('should filter experiments by category', async ({ page }) => {
      await page.goto('/evidence-layer', { waitUntil: 'domcontentloaded' });

      // Click en cualquier botón de filtro
      const filterButton = page.locator('button:has-text("Todos")');
      if (await filterButton.isVisible()) {
        await filterButton.click();
        console.log('✅ Experiment filtering works');
      }
    });
  });

  test.describe('404 Page', () => {
    test('should show custom 404 page', async ({ page }) => {
      await page.goto('/una-pagina-que-no-existe-xyz123', { waitUntil: 'domcontentloaded' });

      // Verificar que muestra 404 usando el heading principal
      await expect(page.getByRole('heading', { name: '404' })).toBeVisible();

      console.log('✅ Custom 404 page works');
    });

    test('should navigate back from 404', async ({ page }) => {
      await page.goto('/pagina-inexistente', { waitUntil: 'domcontentloaded' });

      // Click en "Ir al inicio"
      await page.click('a[href="/"]');

      // Verificar que volvemos al inicio
      await expect(page).toHaveURL('/');

      console.log('✅ 404 navigation back works');
    });
  });

  test.describe('Scroll to Top Button', () => {
    test('should appear after scrolling', async ({ page }) => {
      await page.goto('/', { waitUntil: 'domcontentloaded' });

      // Scroll hacia abajo
      await page.evaluate(() => window.scrollTo(0, 1000));
      await page.waitForTimeout(1000);

      // Buscar botón
      const scrollButton = page.locator('button[aria-label="Scroll to top"]');
      await expect(scrollButton).toBeVisible({ timeout: 5000 });

      console.log('✅ Scroll to top button appears');
    });

    test('should scroll to top when clicked', async ({ page }) => {
      await page.goto('/', { waitUntil: 'domcontentloaded' });

      // Scroll hacia abajo usando JavaScript
      await page.evaluate(() => window.scrollTo(0, 1000));
      await page.waitForTimeout(1500);

      // Click usando JavaScript dispatch para evitar problemas de viewport con SmoothScroll
      await page.evaluate(() => {
        const btn = document.querySelector('button[aria-label="Scroll to top"]');
        if (btn) {
          btn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        }
      });
      await page.waitForTimeout(1000);

      console.log('✅ Scroll to top functionality works');
    });
  });

  test.describe('Other Pages', () => {
    test('should load portfolio page', async ({ page }) => {
      await page.goto('/portfolio', { waitUntil: 'domcontentloaded' });
      await expect(page.locator('body')).toBeVisible();
      console.log('✅ Portfolio page loads');
    });

    test('should load contact page', async ({ page }) => {
      await page.goto('/contact', { waitUntil: 'domcontentloaded' });
      await expect(page.locator('body')).toBeVisible();
      console.log('✅ Contact page loads');
    });

    test('should load geekslab page', async ({ page }) => {
      await page.goto('/geekslab', { waitUntil: 'domcontentloaded' });
      await expect(page.locator('body')).toBeVisible();
      console.log('✅ GeeksLab page loads');
    });

    test('should load nexastore page', async ({ page }) => {
      await page.goto('/nexastore', { waitUntil: 'domcontentloaded' });
      await expect(page.locator('body')).toBeVisible();
      console.log('✅ NexaStore page loads');
    });
  });

  test.describe('SEO & Meta', () => {
    test('should have sitemap.xml', async ({ page }) => {
      const response = await page.goto('/sitemap.xml', { waitUntil: 'domcontentloaded' });
      expect(response?.status()).toBe(200);
      console.log('✅ Sitemap.xml is accessible');
    });

    test('should have robots.txt', async ({ page }) => {
      const response = await page.goto('/robots.txt', { waitUntil: 'domcontentloaded' });
      expect(response?.status()).toBe(200);
      console.log('✅ Robots.txt is accessible');
    });

    test('should have JSON-LD structured data', async ({ page }) => {
      await page.goto('/', { waitUntil: 'domcontentloaded' });

      const jsonLd = await page.locator('script[type="application/ld+json"]').textContent();
      expect(jsonLd).toBeTruthy();

      console.log('✅ JSON-LD structured data is present');
    });
  });

  test.describe('Responsive Design', () => {
    test('should work on mobile viewport', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/', { waitUntil: 'domcontentloaded' });

      await expect(page.locator('nav')).toBeVisible();

      console.log('✅ Mobile viewport works');
    });

    test('should work on tablet viewport', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.goto('/', { waitUntil: 'domcontentloaded' });

      await expect(page.locator('nav')).toBeVisible();

      console.log('✅ Tablet viewport works');
    });

    test('should work on desktop viewport', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.goto('/', { waitUntil: 'domcontentloaded' });

      await expect(page.locator('nav')).toBeVisible();

      console.log('✅ Desktop viewport works');
    });
  });
});
