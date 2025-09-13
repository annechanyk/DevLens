console.log("DevLens loaded!");

// Store the sidebar element reference
let aiSidebar = null;
let isProcessing = false;

// Simple feature detection for common web APIs and CSS properties
const knownFeatures = {
  // JavaScript APIs
  'fetch': 'JavaScript Fetch API',
  'Promise': 'JavaScript Promises',
  'async': 'Async/Await',
  'await': 'Async/Await',
  'IntersectionObserver': 'Intersection Observer API',
  'ServiceWorker': 'Service Worker API',
  'localStorage': 'Web Storage API',
  'sessionStorage': 'Web Storage API',
  'querySelector': 'DOM Selection API',
  'addEventListener': 'Event Listeners',

  // CSS Properties
  'flex': 'CSS Flexbox',
  'grid': 'CSS Grid',
  'transform': 'CSS Transforms',
  'transition': 'CSS Transitions',
  'animation': 'CSS Animations',
  'border-radius': 'CSS Border Radius',
  'box-shadow': 'CSS Box Shadow',
  'linear-gradient': 'CSS Gradients',
  'calc(': 'CSS Calc Function',
  'var(': 'CSS Custom Properties',

  // Modern JavaScript
  'const': 'ES6 Const',
  'let': 'ES6 Let',
  '=>': 'Arrow Functions',
  'class': 'ES6 Classes',
  'import': 'ES6 Modules',
  'export': 'ES6 Modules'
};

// Simulate Baseline compatibility data (in real implementation, use web-features package)
const baselineStatus = {
  'JavaScript Fetch API': { status: 'widely-available', support: '95%' },
  'JavaScript Promises': { status: 'widely-available', support: '97%' },
  'Async/Await': { status: 'widely-available', support: '94%' },
  'CSS Flexbox': { status: 'widely-available', support: '98%' },
  'CSS Grid': { status: 'widely-available', support: '92%' },
  'CSS Custom Properties': { status: 'widely-available', support: '89%' },
  'Intersection Observer API': { status: 'limited-availability', support: '85%' },
  'Service Worker API': { status: 'limited-availability', support: '87%' },
  'Arrow Functions': { status: 'widely-available', support: '96%' },
  'ES6 Classes': { status: 'widely-available', support: '95%' }
};

// Create the AI sidebar
function createAISidebar() {
  if (aiSidebar) return; // Already created

  aiSidebar = document.createElement('div');
  aiSidebar.id = 'ai-doc-sidebar';
  aiSidebar.innerHTML = `
    <div class="ai-sidebar-header">
      <h3>DevLens</h3>
      <button id="close-sidebar">×</button>
    </div>
    <div class="ai-sidebar-content">
      <p><strong>Tip:</strong> Highlight any code on this page to analyze it!</p>
      <div id="analysis-results" style="display: none;">
        <div class="baseline-section">
          <h4>Baseline Compatibility</h4>
          <div id="baseline-results"></div>
        </div>
        <div class="ai-section">
          <h4>AI Analysis</h4>
          <button id="explain-ai" class="ai-button">Explain with Chrome AI</button>
          <button id="advanced-ai" class="ai-button">Advanced AWS Analysis</button>
          <div id="ai-results"></div>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(aiSidebar);

  // Add event listeners
  document.getElementById('close-sidebar').addEventListener('click', hideSidebar);
  document.getElementById('explain-ai').addEventListener('click', explainWithAI);
  document.getElementById('advanced-ai').addEventListener('click', advancedAnalysis);

  console.log("DevLens sidebar created successfully!");
}

// Show/hide sidebar
function showSidebar() {
  if (aiSidebar) {
    aiSidebar.style.display = 'block';
  }
}

function hideSidebar() {
  if (aiSidebar) {
    aiSidebar.style.display = 'none';
  }
}

// Analyze highlighted code for features
function analyzeCodeFeatures(code) {
  const detectedFeatures = [];
  const codeLines = code.toLowerCase();

  for (const [pattern, featureName] of Object.entries(knownFeatures)) {
    if (codeLines.includes(pattern.toLowerCase())) {
      const status = baselineStatus[featureName] || { status: 'unknown', support: 'N/A' };
      detectedFeatures.push({
        name: featureName,
        pattern: pattern,
        ...status
      });
    }
  }

  return detectedFeatures;
}

// Display baseline compatibility results
function displayBaselineResults(features) {
  const resultsDiv = document.getElementById('baseline-results');

  if (features.length === 0) {
    resultsDiv.innerHTML = '<p>No specific web features detected in this snippet.</p>';
    return;
  }

  let html = '';
  features.forEach(feature => {
    const statusColor = feature.status === 'widely-available' ? '#28a745' : '#ffc107';
    const statusIcon = feature.status === 'widely-available' ? '' : '';

    html += `
      <div class="feature-result" style="margin: 8px 0; padding: 8px; border-left: 3px solid ${statusColor}; background: #f8f9fa;">
        <div style="font-weight: bold;">${statusIcon} ${feature.name}</div>
        <div style="font-size: 0.9em; color: #666;">
          Status: <span style="color: ${statusColor}; font-weight: bold;">${feature.status.replace('-', ' ').toUpperCase()}</span> 
          (${feature.support} browser support)
        </div>
      </div>
    `;
  });

  resultsDiv.innerHTML = html;
}

// Simulated Chrome AI explanation (for demo purposes)
function explainWithAI() {
  const resultsDiv = document.getElementById('ai-results');
  const selectedText = window.getSelection().toString().trim();

  if (!selectedText) {
    resultsDiv.innerHTML = '<p style="color: #dc3545;">Please highlight some code first.</p>';
    return;
  }

  // Show loading state
  resultsDiv.innerHTML = '<p>Chrome AI is analyzing your code...</p>';

  // Simulate AI processing delay for a realistic demo
  setTimeout(() => {
    let explanation = "This appears to be modern web development code. It uses current best practices and should work well in all modern browsers.";

    // Enhanced pattern matching for better explanations
    if (selectedText.includes('fetch')) {
      explanation = "This code uses the Fetch API to make HTTP requests. It's a modern, Promise-based way to fetch data from servers, much cleaner than the old XMLHttpRequest.";
    } else if (selectedText.includes('flex') || selectedText.includes('flexbox')) {
      explanation = "This CSS uses Flexbox layout, which makes it easy to distribute space and align items in a container, even when their size is unknown or dynamic.";
    } else if (selectedText.includes('async') || selectedText.includes('await')) {
      explanation = "This code uses async/await syntax, which makes asynchronous code look and behave more like synchronous code, making it easier to read and debug.";
    } else if (selectedText.includes('const') || selectedText.includes('let')) {
      explanation = "This code uses modern ES6 variable declarations. 'const' creates constants that can't be reassigned, while 'let' creates block-scoped variables.";
    } else if (selectedText.includes('grid')) {
      explanation = "This CSS uses Grid layout, a powerful two-dimensional layout system that allows you to create complex layouts with rows and columns.";
    } else if (selectedText.includes('addEventListener')) {
      explanation = "This code uses event listeners to handle user interactions. Event listeners are the modern way to respond to user actions like clicks, key presses, or mouse movements.";
    }

    resultsDiv.innerHTML = `
      <div style="background: #e3f2fd; padding: 12px; border-radius: 8px; margin: 8px 0;">
        <h5>Chrome AI Explanation (Simulated):</h5>
        <p>${explanation}</p>
        <p style="font-size: 0.8em; color: #666; margin-top: 10px;">
          <i>(Note: This is a simulated response as the experimental Chrome AI API was not available during development.)</i>
        </p>
      </div>
    `;
  }, 1500); // 1.5-second delay
}

// Simulated AWS advanced analysis (realistic demo version)
function advancedAnalysis() {
  const resultsDiv = document.getElementById('ai-results');
  const selectedText = window.getSelection().toString().trim();

  if (!selectedText) {
    resultsDiv.innerHTML = '<p style="color: #dc3545;">Please highlight some code first.</p>';
    return;
  }

  resultsDiv.innerHTML = '<p>Contacting AWS AI Agent...</p>';

  // Simulate a realistic delay
  setTimeout(() => {
    const simulatedAnalysis = `<strong>Detailed Analysis (Simulated):</strong><br><ul><li><strong>Explanation:</strong> This code uses the Fetch API, a modern interface for making network requests. It is promise-based and offers a more powerful and flexible feature set than the older XMLHttpRequest.</li><li><strong>Browser Compatibility:</strong> Widely supported in all modern browsers (95%+). Polyfills are required for Internet Explorer.</li><li><strong>Performance Impact:</strong> Low. The API is efficiently implemented in browsers. Performance depends on the network speed and the size of the fetched resource.</li><li><strong>Security Best Practices:</strong> Always handle potential errors with .catch() or try/catch blocks. Be mindful of CORS policies on the server you are fetching from. Avoid exposing sensitive API keys on the client-side.</li></ul><p style="font-size: 0.8em; color: #666; margin-top: 10px;"><i>(Note: This is a simulated response to demonstrate a fast, asynchronous architecture. Real-time analysis can exceed API Gateway's 29-second limit on initial requests.)</i></p>`;

    resultsDiv.innerHTML = `
      <div style="background: #fff3cd; padding: 12px; border-radius: 8px; margin: 8px 0;">
        <h5>AWS Advanced Analysis:</h5>
        <p>${simulatedAnalysis}</p>
      </div>
    `;
  }, 1200); // 1.2-second delay
}

// Simple explanation generator (fallback for when Chrome AI is not available)
function generateSimpleExplanation(code) {
  if (code.includes('fetch')) {
    return "This code uses the Fetch API to make HTTP requests. It's a modern, Promise-based way to fetch data from servers, much cleaner than the old XMLHttpRequest.";
  } else if (code.includes('flex') || code.includes('flexbox')) {
    return "This CSS uses Flexbox layout, which makes it easy to distribute space and align items in a container, even when their size is unknown or dynamic.";
  } else if (code.includes('async') || code.includes('await')) {
    return "This code uses async/await syntax, which makes asynchronous code look and behave more like synchronous code, making it easier to read and debug.";
  } else if (code.includes('const') || code.includes('let')) {
    return "This code uses modern ES6 variable declarations. 'const' creates constants that can't be reassigned, while 'let' creates block-scoped variables.";
  } else {
    return "This appears to be modern web development code. It uses current best practices and should work well in all modern browsers.";
  }
}

// Advanced analysis generator (simulates AWS Bedrock)
function generateAdvancedAnalysis(code) {
  return `
    <strong>Detailed Analysis:</strong><br>
    <strong>Browser Compatibility:</strong> This code is compatible with 94%+ of browsers in use<br>
    <strong>Performance Impact:</strong> Low to moderate - uses efficient modern APIs<br>
    <strong>Best Practices:</strong> Follows current web standards<br>
    <strong>Alternative Approaches:</strong> Consider adding polyfills for legacy browser support<br>
    <strong>Security Considerations:</strong> No obvious security issues detected
  `;
}

// Main text selection handler
function handleTextSelection() {
  if (isProcessing) return;

  const selection = window.getSelection().toString().trim();

  // Only process meaningful selections (longer than 10 characters)
  if (selection.length > 10) {
    console.log("Text selected:", selection.substring(0, 100) + "...");

    // Create sidebar if it doesn't exist
    if (!aiSidebar) {
      createAISidebar();
    }

    // Show the sidebar
    showSidebar();

    // Analyze the selected code
    const features = analyzeCodeFeatures(selection);
    console.log("Detected features:", features);

    // Display results
    document.getElementById('analysis-results').style.display = 'block';
    displayBaselineResults(features);

    // Clear previous AI results
    document.getElementById('ai-results').innerHTML = '';
  }
}

// Initialize the extension
function initializeExtension() {
  console.log("Initializing DevLens...");

  // Add event listener for text selection
  document.addEventListener('mouseup', handleTextSelection);

  // Show a subtle notification that the extension is active
  const notification = document.createElement('div');
  notification.innerHTML = 'DevLens Active - Highlight code to analyze!';
  notification.style.cssText = `
    position: fixed; 
    top: 20px; 
    right: 20px; 
    background: #007bff; 
    color: white; 
    padding: 12px 20px; 
    border-radius: 8px; 
    z-index: 10000; 
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 14px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    animation: slideIn 0.3s ease-out;
  `;

  document.body.appendChild(notification);

  // Remove notification after 3 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.animation = 'slideOut 0.3s ease-in';
      setTimeout(() => notification.remove(), 300);
    }
  }, 3000);

  console.log("DevLens initialized successfully!");
}

// Wait for DOM to be ready, then initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeExtension);
} else {
  initializeExtension();
}