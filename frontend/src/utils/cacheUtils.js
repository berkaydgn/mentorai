// Cache temizleme fonksiyonları
export const clearBrowserCache = () => {
  // Local Storage'ı temizle
  localStorage.clear();
  
  // Session Storage'ı temizle
  sessionStorage.clear();
  
  // Cache API'yi temizle
  if ('caches' in window) {
    caches.keys().then(function(names) {
      for (let name of names) {
        caches.delete(name);
      }
    });
  }
  
  // Sayfayı yenile
  window.location.reload(true);
};

// Belirli bir önbelleği temizle
export const clearSpecificCache = (cacheName) => {
  if ('caches' in window) {
    caches.delete(cacheName);
  }
};

// Local Storage'dan belirli bir öğeyi temizle
export const clearLocalStorageItem = (key) => {
  localStorage.removeItem(key);
};

// Session Storage'dan belirli bir öğeyi temizle
export const clearSessionStorageItem = (key) => {
  sessionStorage.removeItem(key);
}; 