// Error handler to suppress common browser extension errors
(function() {
    'use strict';
    
    // Suppress runtime.lastError messages from extensions
    window.addEventListener('error', function(e) {
        // Common extension errors to suppress
        const extensionErrors = [
            'runtime.lastError',
            'Extension context invalidated',
            'message channel closed',
            'Could not establish connection'
        ];
        
        if (extensionErrors.some(error => e.message.includes(error))) {
            e.preventDefault();
            return true; // Suppress the error
        }
    });
    
    // Suppress unhandled promise rejections from extensions
    window.addEventListener('unhandledrejection', function(e) {
        if (e.reason && e.reason.message) {
            const extensionErrors = [
                'runtime.lastError',
                'Extension context invalidated',
                'message channel closed'
            ];
            
            if (extensionErrors.some(error => e.reason.message.includes(error))) {
                e.preventDefault();
                return true; // Suppress the error
            }
        }
    });
})();