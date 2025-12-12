import { test, expect, Page } from '@playwright/test';

/**
 * Bilingual (EN/ES) Language Toggle E2E Tests
 * 
 * These tests verify that the language toggle functionality works correctly
 * across all pages of the portfolio. They ensure content switches properly
 * between English and Spanish without page reload.
 */
test.describe('Bilingual Language Toggle Tests', () => {

    /**
     * Helper function to click the language toggle in the navbar
     * The toggle is typically a button containing "EN" and "ES" text
     */
    async function toggleLanguage(page: Page): Promise<void> {
        // Look for the language toggle button (contains EN/ES text)
        const languageToggle = page.locator('button:has-text("EN"):has-text("ES")');

        // Ensure toggle is visible (may need to open mobile menu first)
        if (!(await languageToggle.isVisible())) {
            const menuButton = page.locator('button[aria-label="Toggle menu"]');
            if (await menuButton.isVisible()) {
                await menuButton.click();
                await page.waitForTimeout(500);
            }
        }

        await expect(languageToggle).toBeVisible();
        await languageToggle.click();
        await page.waitForTimeout(300); // Wait for text to update
    }

    /**
     * Helper to check if text contains Spanish-specific characters/words
     */
    function isSpanishText(text: string): boolean {
        const spanishIndicators = [
            'Disponible', 'Proyectos', 'Contacto', 'Inicio', 'Sobre',
            'Experimentos', 'Métricas', 'Solicitud', 'Bitácora',
            'ó', 'ñ', 'á', 'é', 'í', 'ú'
        ];
        return spanishIndicators.some(indicator => text.includes(indicator));
    }

    test.describe('Homepage Language Toggle', () => {
        test('should toggle navbar text between EN and ES', async ({ page }) => {
            await page.goto('/', { waitUntil: 'domcontentloaded' });

            // Get initial navbar text
            const navText = await page.locator('nav').textContent();
            const isInitiallySpanish = isSpanishText(navText || '');

            console.log(`📍 Initial language: ${isInitiallySpanish ? 'Spanish' : 'English'}`);

            // Toggle language
            await toggleLanguage(page);

            // Get new navbar text
            const newNavText = await page.locator('nav').textContent();
            const isNowSpanish = isSpanishText(newNavText || '');

            // Verify language changed
            expect(isNowSpanish).not.toBe(isInitiallySpanish);

            console.log(`✅ Language toggled to: ${isNowSpanish ? 'Spanish' : 'English'}`);
        });

        test('should toggle hero section between EN and ES', async ({ page }) => {
            await page.goto('/', { waitUntil: 'domcontentloaded' });

            // Check for English "Available for new opportunities" badge
            const englishBadge = page.getByText('Available for new opportunities');
            const spanishBadge = page.getByText('Disponible para nuevas oportunidades');

            const hasEnglishInitially = await englishBadge.isVisible().catch(() => false);

            if (hasEnglishInitially) {
                // Toggle to Spanish
                await toggleLanguage(page);
                await expect(spanishBadge).toBeVisible();
                console.log('✅ Hero badge toggles EN → ES correctly');
            } else {
                // Toggle to English
                await toggleLanguage(page);
                await expect(englishBadge).toBeVisible();
                console.log('✅ Hero badge toggles ES → EN correctly');
            }
        });

        test('should toggle footer between EN and ES', async ({ page }) => {
            await page.goto('/', { waitUntil: 'domcontentloaded' });

            // Scroll to footer
            await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
            await page.waitForTimeout(500);

            const footer = page.locator('footer');
            const footerText = await footer.textContent();

            const isInitiallySpanish = footerText?.includes('Contáctame') || footerText?.includes('derechos reservados');

            await toggleLanguage(page);
            await page.waitForTimeout(300);

            const newFooterText = await footer.textContent();
            const isNowSpanish = newFooterText?.includes('Contáctame') || newFooterText?.includes('derechos reservados');

            expect(isNowSpanish).not.toBe(isInitiallySpanish);
            console.log('✅ Footer text toggles correctly');
        });
    });

    test.describe('Evidence Layer Language Toggle', () => {
        test('should toggle hero title between EN and ES', async ({ page }) => {
            await page.goto('/evidence-layer', { waitUntil: 'domcontentloaded' });

            const h1 = page.locator('h1');
            const initialTitle = await h1.textContent();

            const isInitiallyEnglish = initialTitle?.includes('Recruiter Evidence Layer');
            const isInitiallySpanish = initialTitle?.includes('Capa de Evidencia');

            console.log(`📍 Initial Evidence Layer title: "${initialTitle}"`);

            // Toggle language
            await toggleLanguage(page);

            const newTitle = await h1.textContent();

            if (isInitiallyEnglish) {
                expect(newTitle).toContain('Capa de Evidencia');
                console.log('✅ Evidence Layer title toggles EN → ES');
            } else if (isInitiallySpanish) {
                expect(newTitle).toContain('Recruiter Evidence Layer');
                console.log('✅ Evidence Layer title toggles ES → EN');
            }
        });

        test('should toggle SLA section title between EN and ES', async ({ page }) => {
            await page.goto('/evidence-layer#sla', { waitUntil: 'domcontentloaded' });

            const slaSection = page.locator('#sla');
            const slaTitle = slaSection.locator('h2');

            const initialTitle = await slaTitle.textContent();
            console.log(`📍 Initial SLA title: "${initialTitle}"`);

            await toggleLanguage(page);

            const newTitle = await slaTitle.textContent();

            // Verify title changed (either way)
            expect(newTitle).not.toBe(initialTitle);
            console.log(`✅ SLA title toggled to: "${newTitle}"`);
        });

        test('should toggle experiments section between EN and ES', async ({ page }) => {
            await page.goto('/evidence-layer#experiments', { waitUntil: 'domcontentloaded' });

            const experimentsSection = page.locator('#experiments');
            const title = experimentsSection.locator('h2');

            const initialTitle = await title.textContent();

            await toggleLanguage(page);

            const newTitle = await title.textContent();

            // Verify content changed
            if (initialTitle?.includes('Experiments Log')) {
                expect(newTitle).toContain('Bitácora');
            } else {
                expect(newTitle).toContain('Experiments');
            }

            console.log('✅ Experiments section toggles correctly');
        });

        test('should toggle RFC section between EN and ES', async ({ page }) => {
            await page.goto('/evidence-layer#rfc', { waitUntil: 'domcontentloaded' });

            const rfcSection = page.locator('#rfc');
            const title = rfcSection.locator('h2');

            const initialTitle = await title.textContent();

            await toggleLanguage(page);

            const newTitle = await title.textContent();

            expect(newTitle).not.toBe(initialTitle);
            console.log('✅ RFC section toggles correctly');
        });
    });

    test.describe('Contact Page Language Toggle', () => {
        test('should toggle contact form labels between EN and ES', async ({ page }) => {
            await page.goto('/contact', { waitUntil: 'domcontentloaded' });

            const h1 = page.locator('h1');
            const initialTitle = await h1.textContent();

            await toggleLanguage(page);

            const newTitle = await h1.textContent();

            // Verify title changed
            expect(newTitle).not.toBe(initialTitle);
            console.log('✅ Contact page title toggles correctly');
        });
    });

    test.describe('Portfolio Page Language Toggle', () => {
        test('should toggle portfolio content between EN and ES', async ({ page }) => {
            await page.goto('/portfolio', { waitUntil: 'domcontentloaded' });

            const pageContent = await page.locator('main').textContent();
            const isInitiallySpanish = isSpanishText(pageContent || '');

            await toggleLanguage(page);

            const newContent = await page.locator('main').textContent();
            const isNowSpanish = isSpanishText(newContent || '');

            // Content language should have changed
            expect(isNowSpanish).not.toBe(isInitiallySpanish);
            console.log('✅ Portfolio page toggles correctly');
        });
    });

    test.describe('Lab Page Language Toggle', () => {
        test('should toggle lab content between EN and ES', async ({ page }) => {
            await page.goto('/lab', { waitUntil: 'domcontentloaded' });

            const pageContent = await page.locator('main').textContent();
            const isInitiallySpanish = isSpanishText(pageContent || '');

            await toggleLanguage(page);

            const newContent = await page.locator('main').textContent();
            const isNowSpanish = isSpanishText(newContent || '');

            expect(isNowSpanish).not.toBe(isInitiallySpanish);
            console.log('✅ Lab page toggles correctly');
        });
    });

    test.describe('CV Page Language Toggle', () => {
        test('should toggle CV content between EN and ES', async ({ page }) => {
            await page.goto('/cv', { waitUntil: 'domcontentloaded' });

            // Check for specific translatable text
            const downloadButton = page.getByRole('button', { name: /Download|Descargar/i });
            await expect(downloadButton).toBeVisible();

            const initialButtonText = await downloadButton.textContent();

            await toggleLanguage(page);

            const newButtonText = await downloadButton.textContent();

            // Button text should change between languages
            expect(newButtonText).not.toBe(initialButtonText);
            console.log('✅ CV page toggles correctly');
        });
    });

    test.describe('Language Persistence', () => {
        test('should persist language selection across page navigation', async ({ page }) => {
            // Start on homepage
            await page.goto('/', { waitUntil: 'domcontentloaded' });

            // Toggle to get a known state
            await toggleLanguage(page);

            const navTextAfterToggle = await page.locator('nav').textContent();
            const isSpanishAfterToggle = isSpanishText(navTextAfterToggle || '');

            // Navigate to Evidence Layer
            await page.goto('/evidence-layer', { waitUntil: 'domcontentloaded' });

            // Verify language persisted
            const evidenceNavText = await page.locator('nav').textContent();
            const isStillSameLanguage = isSpanishText(evidenceNavText || '') === isSpanishAfterToggle;

            expect(isStillSameLanguage).toBe(true);
            console.log('✅ Language preference persists across navigation');
        });
    });

    test.describe('No Mixed Language Content', () => {
        test('Evidence Layer should not mix EN/ES in single view', async ({ page }) => {
            await page.goto('/evidence-layer', { waitUntil: 'domcontentloaded' });

            // Get all major section texts
            const heroTitle = await page.locator('h1').textContent();
            const slaTitle = await page.locator('#sla h2').textContent();
            const experimentsTitle = await page.locator('#experiments h2').textContent();
            const rfcTitle = await page.locator('#rfc h2').textContent();

            // Check if all are in the same language
            const heroIsEnglish = heroTitle?.includes('Recruiter');
            const slaIsEnglish = slaTitle?.includes('SLA Metrics') || slaTitle?.includes('Metrics');
            const experimentsIsEnglish = experimentsTitle?.includes('Experiments') || experimentsTitle?.includes('Log');
            const rfcIsEnglish = rfcTitle?.includes('Inverse') || rfcTitle?.includes('RFC Application');

            // All sections should be in the same language
            const allEnglish = heroIsEnglish && slaIsEnglish && experimentsIsEnglish && rfcIsEnglish;
            const allSpanish = !heroIsEnglish && !slaIsEnglish && !experimentsIsEnglish && !rfcIsEnglish;

            expect(allEnglish || allSpanish).toBe(true);
            console.log(`✅ Evidence Layer content is consistent (all ${allEnglish ? 'English' : 'Spanish'})`);
        });
    });
});
