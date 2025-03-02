const fs = require('fs').promises;
const path = require('path');
async function createProjectDist() {
    try {
        // 1. Создаем папку project-dist
        await fs.mkdir('project-dist', { recursive: true });
        // 2. Читаем template.html
        let templateContent = await fs.readFile('template.html', 'utf-8');
        // 3. Читаем компоненты и заменяем теги в шаблоне
        const componentsDir = path.join(__dirname, 'components');
        const componentFiles = await fs.readdir(componentsDir);
        for (const file of componentFiles) {
            const componentPath = path.join(componentsDir, file);
            const data = await fs.readFile(componentPath, 'utf-8');
            const componentName = path.basename(file, path.extname(file));
            templateContent = templateContent.replace(new RegExp(`{{\\s*${componentName}\\s*}}`, 'g'), data);
        }
        // 4. Записываем результат в project-dist/index.html
        await fs.writeFile(path.join('project-dist', 'index.html'), templateContent);
        // 5. Компилируем стили из папки styles
        const stylesDir = path.join(__dirname, 'styles');
        const styleFiles = await fs.readdir(stylesDir);
        const styleContent = [];
        for (const file of styleFiles) {
            if (path.extname(file) === '.css') { // Проверяем, что файл имеет расширение .css
                const stylePath = path.join(stylesDir, file);
                const data = await fs.readFile(stylePath, 'utf-8');
                styleContent.push(data);
            }
        }
        // Записываем стили в project-dist/style.css
        await fs.writeFile(path.join('project-dist', 'style.css'), styleContent.join('\n'));
        // 6. Копируем папку assets в project-dist/assets
        const assetsSrcDir = path.join(__dirname, 'assets');
        const assetsDestDir = path.join('project-dist', 'assets');
        await copyAssets(assetsSrcDir, assetsDestDir);
    } catch (err) {
        console.error(err);
    }
}
async function copyAssets(src, dest) {
    await fs.mkdir(dest, { recursive: true });
    const files = await fs.readdir(src);
    for (const file of files) {
        const srcFile = path.join(src, file);
        const destFile = path.join(dest, file);
        const stats = await fs.stat(srcFile);
        if (stats.isDirectory()) {
            await copyAssets(srcFile, destFile);
        } else {
            await fs.copyFile(srcFile, destFile);
        }
    }
}
// Запускаем функцию
createProjectDist();