/**
 * 風格管理頁面
 */

import { renderSidebar } from '../components/sidebar.js';
import { renderHeader } from '../components/header.js';
import { renderTable, renderTag, renderSearchBox } from '../components/common.js';
import { showModal, closeModal, showFormModal } from '../components/modals.js';

/**
 * 渲染風格管理頁面
 */
export function renderStylesPage() {
    return `
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>風格管理 - Flux AI Pro 管理後台</title>
    <link rel="stylesheet" href="/admin/styles/base.css">
    <style>
        .style-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 16px;
            padding: 20px;
        }
        .style-card {
            background: white;
            border-radius: 12px;
            padding: 20px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            transition: transform 0.2s, box-shadow 0.2s;
        }
        .style-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        .style-card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 12px;
        }
        .style-name {
            font-size: 16px;
            font-weight: 600;
            color: #1f2937;
        }
        .style-category {
            font-size: 12px;
            color: #6b7280;
            margin-bottom: 8px;
        }
        .style-prompt {
            font-size: 13px;
            color: #4b5563;
            background: #f3f4f6;
            padding: 8px 12px;
            border-radius: 6px;
            margin-bottom: 12px;
            max-height: 60px;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .style-actions {
            display: flex;
            gap: 8px;
        }
        .style-badge {
            display: inline-block;
            padding: 2px 8px;
            border-radius: 4px;
            font-size: 11px;
            font-weight: 500;
        }
        .style-badge.builtin {
            background: #dbeafe;
            color: #1e40af;
        }
        .style-badge.custom {
            background: #fce7f3;
            color: #9d174d;
        }
    </style>
</head>
<body>
    ${renderSidebar('styles')}
    
    <div class="main-content">
        ${renderHeader('風格管理')}
        
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-value" id="totalStyles">-</div>
                <div class="stat-label">總風格數</div>
            </div>
            <div class="stat-card green">
                <div class="stat-value" id="builtinStyles">-</div>
                <div class="stat-label">內建風格</div>
            </div>
            <div class="stat-card orange">
                <div class="stat-value" id="customStyles">-</div>
                <div class="stat-label">自定義風格</div>
            </div>
            <div class="stat-card blue">
                <div class="stat-value" id="categoriesCount">-</div>
                <div class="stat-label">分類數量</div>
            </div>
        </div>
        
        <div style="padding: 24px;">
            <div class="card">
                <div class="card-header">
                    <h3>🎨 風格列表</h3>
                    <div style="display: flex; gap: 12px; align-items: center;">
                        <input type="text" class="form-input" id="searchInput" 
                               placeholder="搜尋風格..." style="width: 200px;">
                        <select class="form-select" id="categoryFilter" style="width: 150px;">
                            <option value="">所有分類</option>
                        </select>
                        <button class="btn btn-primary" onclick="showAddStyleModal()">
                            + 新增風格
                        </button>
                    </div>
                </div>
                <div class="card-body">
                    <div class="style-grid" id="styleGrid">
                        <div class="loading-state">
                            <div class="spinner"></div>
                            <p>載入中...</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <div id="modalContainer"></div>
    
    <script>
        const token = localStorage.getItem('adminToken');
        if (!token) window.location.href = '/admin/login';
        
        let allStyles = {};
        let allCategories = {};
        let customStyles = {};
        
        async function loadStyles() {
            try {
                const response = await fetch('/admin/api/styles', {
                    headers: { 'Authorization': 'Bearer ' + token }
                });
                const data = await response.json();
                
                if (data.success) {
                    allStyles = data.styles || {};
                    allCategories = data.categories || {};
                    customStyles = data.custom_styles || {};
                    
                    updateStats();
                    renderStyles();
                    updateCategoryFilter();
                }
            } catch (error) {
                console.error('載入失敗:', error);
                document.getElementById('styleGrid').innerHTML = \`
                    <div class="error-state">
                        <p style="color: #ef4444;">載入失敗，請重新整理頁面</p>
                    </div>
                \`;
            }
        }
        
        function updateStats() {
            const builtinCount = Object.keys(allStyles).length;
            const customCount = Object.keys(customStyles).length;
            const categoriesCount = Object.keys(allCategories).length;
            
            document.getElementById('totalStyles').textContent = builtinCount + customCount;
            document.getElementById('builtinStyles').textContent = builtinCount;
            document.getElementById('customStyles').textContent = customCount;
            document.getElementById('categoriesCount').textContent = categoriesCount;
        }
        
        function updateCategoryFilter() {
            const select = document.getElementById('categoryFilter');
            select.innerHTML = '<option value="">所有分類</option>' +
                Object.entries(allCategories).map(([id, cat]) => 
                    \`<option value="\${id}">\${cat.name || id}</option>\`
                ).join('');
        }
        
        function renderStyles() {
            const searchTerm = document.getElementById('searchInput').value.toLowerCase();
            const categoryFilter = document.getElementById('categoryFilter').value;
            
            let html = '';
            
            // 內建風格
            Object.entries(allStyles).forEach(([id, style]) => {
                if (matchesFilter(style, id, searchTerm, categoryFilter)) {
                    html += renderStyleCard(id, style, false);
                }
            });
            
            // 自定義風格
            Object.entries(customStyles).forEach(([id, style]) => {
                if (matchesFilter(style, id, searchTerm, categoryFilter)) {
                    html += renderStyleCard(id, style, true);
                }
            });
            
            document.getElementById('styleGrid').innerHTML = html || 
                '<div class="empty-state"><p>沒有找到風格</p></div>';
        }
        
        function matchesFilter(style, id, searchTerm, category) {
            const name = (style.name || id).toLowerCase();
            const styleCategory = style.category || '';
            return name.includes(searchTerm) && (!category || styleCategory === category);
        }
        
        function renderStyleCard(id, style, isCustom) {
            return \`
                <div class="style-card">
                    <div class="style-card-header">
                        <span class="style-name">\${style.name || id}</span>
                        <span class="style-badge \${isCustom ? 'custom' : 'builtin'}">
                            \${isCustom ? '自定義' : '內建'}
                        </span>
                    </div>
                    <div class="style-category">分類: \${allCategories[style.category]?.name || style.category || '未分類'}</div>
                    <div class="style-prompt">\${style.prompt || '無提示詞'}</div>
                    <div class="style-actions">
                        \${isCustom ? \`
                            <button class="btn btn-secondary btn-sm" onclick="editStyle('\${id}')">編輯</button>
                            <button class="btn btn-danger btn-sm" onclick="deleteStyle('\${id}')">刪除</button>
                        \` : \`
                            <button class="btn btn-secondary btn-sm" onclick="viewStyle('\${id}')">查看</button>
                        \`}
                    </div>
                </div>
            \`;
        }
        
        function showAddStyleModal() {
            const categoryOptions = Object.entries(allCategories).map(([id, cat]) =>
                \`<option value="\${id}">\${cat.name || id}</option>\`
            ).join('');
            
            document.getElementById('modalContainer').innerHTML = \`
                <div class="modal-overlay" onclick="closeModal(event)">
                    <div class="modal" onclick="event.stopPropagation()">
                        <h2>新增自定義風格</h2>
                        <form onsubmit="createStyle(event)">
                            <div class="form-group">
                                <label class="form-label">風格 ID *</label>
                                <input type="text" class="form-input" id="newStyleId" required 
                                       placeholder="例如: my-style">
                            </div>
                            <div class="form-group">
                                <label class="form-label">顯示名稱 *</label>
                                <input type="text" class="form-input" id="newStyleName" required 
                                       placeholder="例如: 我的風格">
                            </div>
                            <div class="form-group">
                                <label class="form-label">分類</label>
                                <select class="form-select" id="newStyleCategory">
                                    <option value="">未分類</option>
                                    \${categoryOptions}
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">提示詞</label>
                                <textarea class="form-textarea" id="newStylePrompt" rows="3"
                                          placeholder="風格提示詞..."></textarea>
                            </div>
                            <div class="form-group">
                                <label class="form-label">負面提示詞</label>
                                <textarea class="form-textarea" id="newStyleNegative" rows="2"
                                          placeholder="負面提示詞..."></textarea>
                            </div>
                            <div class="form-actions">
                                <button type="button" class="btn btn-secondary" onclick="closeModal()">取消</button>
                                <button type="submit" class="btn btn-primary">創建</button>
                            </div>
                        </form>
                    </div>
                </div>
            \`;
        }
        
        async function createStyle(event) {
            event.preventDefault();
            
            const id = document.getElementById('newStyleId').value.trim();
            const name = document.getElementById('newStyleName').value.trim();
            const category = document.getElementById('newStyleCategory').value;
            const prompt = document.getElementById('newStylePrompt').value;
            const negative = document.getElementById('newStyleNegative').value;
            
            try {
                const response = await fetch('/admin/api/styles', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    body: JSON.stringify({ id, name, category, prompt, negative })
                });
                
                const data = await response.json();
                if (data.success) {
                    closeModal();
                    loadStyles();
                } else {
                    alert('創建失敗: ' + (data.error || '未知錯誤'));
                }
            } catch (error) {
                alert('網絡錯誤: ' + error.message);
            }
        }
        
        function editStyle(id) {
            const style = customStyles[id];
            if (!style) return;
            
            const categoryOptions = Object.entries(allCategories).map(([catId, cat]) =>
                \`<option value="\${catId}" \${style.category === catId ? 'selected' : ''}>\${cat.name || catId}</option>\`
            ).join('');
            
            document.getElementById('modalContainer').innerHTML = \`
                <div class="modal-overlay" onclick="closeModal(event)">
                    <div class="modal" onclick="event.stopPropagation()">
                        <h2>編輯風格</h2>
                        <form onsubmit="updateStyle(event, '\${id}')">
                            <div class="form-group">
                                <label class="form-label">顯示名稱</label>
                                <input type="text" class="form-input" id="editStyleName" value="\${style.name || ''}">
                            </div>
                            <div class="form-group">
                                <label class="form-label">分類</label>
                                <select class="form-select" id="editStyleCategory">
                                    <option value="">未分類</option>
                                    \${categoryOptions}
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">提示詞</label>
                                <textarea class="form-textarea" id="editStylePrompt" rows="3">\${style.prompt || ''}</textarea>
                            </div>
                            <div class="form-group">
                                <label class="form-label">負面提示詞</label>
                                <textarea class="form-textarea" id="editStyleNegative" rows="2">\${style.negative || ''}</textarea>
                            </div>
                            <div class="form-actions">
                                <button type="button" class="btn btn-secondary" onclick="closeModal()">取消</button>
                                <button type="submit" class="btn btn-primary">保存</button>
                            </div>
                        </form>
                    </div>
                </div>
            \`;
        }
        
        async function updateStyle(event, id) {
            event.preventDefault();
            
            const name = document.getElementById('editStyleName').value;
            const category = document.getElementById('editStyleCategory').value;
            const prompt = document.getElementById('editStylePrompt').value;
            const negative = document.getElementById('editStyleNegative').value;
            
            try {
                const response = await fetch('/admin/api/styles/' + id, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    body: JSON.stringify({ name, category, prompt, negative })
                });
                
                if (response.ok) {
                    closeModal();
                    loadStyles();
                } else {
                    alert('更新失敗');
                }
            } catch (error) {
                alert('網絡錯誤: ' + error.message);
            }
        }
        
        async function deleteStyle(id) {
            if (!confirm('確定要刪除此風格嗎？')) return;
            
            try {
                const response = await fetch('/admin/api/styles/' + id, {
                    method: 'DELETE',
                    headers: { 'Authorization': 'Bearer ' + token }
                });
                
                if (response.ok) {
                    loadStyles();
                } else {
                    alert('刪除失敗');
                }
            } catch (error) {
                alert('網絡錯誤: ' + error.message);
            }
        }
        
        function viewStyle(id) {
            const style = allStyles[id];
            if (!style) return;
            
            document.getElementById('modalContainer').innerHTML = \`
                <div class="modal-overlay" onclick="closeModal(event)">
                    <div class="modal" onclick="event.stopPropagation()">
                        <h2>\${style.name || id}</h2>
                        <div class="info-item"><label>分類</label><span>\${allCategories[style.category]?.name || '未分類'}</span></div>
                        <div class="info-item" style="margin-top: 12px;">
                            <label>提示詞</label>
                            <div style="background: #f3f4f6; padding: 12px; border-radius: 8px; margin-top: 4px;">
                                \${style.prompt || '無'}
                            </div>
                        </div>
                        <div class="info-item" style="margin-top: 12px;">
                            <label>負面提示詞</label>
                            <div style="background: #f3f4f6; padding: 12px; border-radius: 8px; margin-top: 4px;">
                                \${style.negative || '無'}
                            </div>
                        </div>
                        <div class="form-actions" style="margin-top: 20px;">
                            <button class="btn btn-secondary" onclick="closeModal()">關閉</button>
                        </div>
                    </div>
                </div>
            \`;
        }
        
        function closeModal(event) {
            if (event && event.target !== event.currentTarget) return;
            document.getElementById('modalContainer').innerHTML = '';
        }
        
        // 搜尋和篩選
        document.getElementById('searchInput').addEventListener('input', renderStyles);
        document.getElementById('categoryFilter').addEventListener('change', renderStyles);
        
        // 初始化
        loadStyles();
    </script>
</body>
</html>
    `;
}
