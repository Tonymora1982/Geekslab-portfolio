const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const BUILD_DIR = 'out';
const DEPLOY_DIR = 'hostinger-deploy';
const PUBLIC_HTML = path.join(DEPLOY_DIR, 'public_html');
const SUBDOMAINS = ['portfolio', 'cv', 'lab', 'geekslab', 'nexastore', 'qms'];

// Helper to copy directory recursively
function copyDir(src, dest) {
    if (!fs.existsSync(src)) return;

    fs.mkdirSync(dest, { recursive: true });
    const entries = fs.readdirSync(src, { withFileTypes: true });

    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            copyDir(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

console.log('🚀 Starting Hostinger Build Process...');

// 1. Clean previous deploy
if (fs.existsSync(DEPLOY_DIR)) {
    console.log('🧹 Cleaning previous deploy folder...');
    fs.rmSync(DEPLOY_DIR, { recursive: true, force: true });
}

// 2. Run Next.js Build
console.log('🏗️  Running Next.js Build...');
try {
    execSync('npm run build', { stdio: 'inherit' });
} catch (error) {
    console.error('❌ Build failed!');
    process.exit(1);
}

// 3. Create structure
console.log('📂 Creating folder structure...');
fs.mkdirSync(PUBLIC_HTML, { recursive: true });

// 4. Copy Root Files (Main Domain)
console.log('📦 Copying main domain files...');
copyDir(BUILD_DIR, PUBLIC_HTML);

// 5. Process Subdomains
console.log('🔗 Processing subdomains...');
const assetsDir = path.join(BUILD_DIR, '_next');

SUBDOMAINS.forEach(subdomain => {
    const subdomainSource = path.join(BUILD_DIR, subdomain);
    const subdomainDest = path.join(PUBLIC_HTML, subdomain);

    if (fs.existsSync(subdomainSource)) {
        console.log(`   - Processing ${subdomain}...`);

        // Ensure subdomain folder exists in deploy (it might already be there from full copy, but let's be safe)
        // Actually, the full copy (step 4) already copied 'out/portfolio' to 'public_html/portfolio'.
        // So the HTML files are there.

        // CRITICAL: Copy _next assets to subdomain folder so relative paths work
        // if the subdomain is served as a root (e.g. portfolio.geekslab.tech)
        const destAssets = path.join(subdomainDest, '_next');
        console.log(`     + Injecting assets to ${subdomain}/_next`);
        copyDir(assetsDir, destAssets);
    }
});

console.log('\n✅ Build Complete!');
console.log(`👉 Upload the contents of "${PUBLIC_HTML}" to your Hostinger "public_html" folder.`);
console.log('   (This structure supports both main domain and subdomains mapped to subfolders)');
