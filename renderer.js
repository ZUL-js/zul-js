import './style.css';
import mermaid from 'mermaid';
import { createIcons, Moon, Sun } from 'lucide';

createIcons({ icons: { Moon, Sun } });

const mockData = {
  title: "ZUL.js Analytics",
  series: [
    { label: "Alpha", value: 45 },
    { label: "Beta", value: 82 },
    { label: "Gamma", value: 60 },
    { label: "Delta", value: 95 }
  ]
};

const getSyntax = (type, isDark) => {
  const theme = isDark ? 'dark' : 'default';
  const header = `%%{init: {'theme': '${theme}'}}%%\n`;
  
  if (type === 'pie') {
    return `${header}pie title ${mockData.title}\n` + 
      mockData.series.map(s => `    "${s.label}" : ${s.value}`).join('\n');
  }
  
  if (type === 'bar' || type === 'line') {
    return `${header}xychart-beta\n    title "${mockData.title}"\n` +
      `    x-axis [${mockData.series.map(s => s.label).join(', ')}]\n` +
      `    ${type} [${mockData.series.map(s => s.value).join(', ')}]`;
  }

  if (type === 'sankey') {
    return `${header}sankey\n    Alpha,Beta,20\n    Gamma,Beta,40\n    Beta,Delta,50`;
  }

  return `${header}graph TD\n    A[Data In] --> B{Process}\n    B -->|Success| C[Visual Result]\n    B -->|Error| D[Debug]`;
};

async function draw() {
  const container = document.getElementById('chart-container');
  const type = document.getElementById('chart-type').value;
  const isDark = document.documentElement.classList.contains('dark');

  mermaid.initialize({ startOnLoad: false, theme: isDark ? 'dark' : 'default' });
  
  try {
    const { svg } = await mermaid.render(`id-${Date.now()}`, getSyntax(type, isDark));
    container.innerHTML = svg;
  } catch (e) {
    console.error(e);
  }
}

document.getElementById('render-btn').addEventListener('click', draw);

document.getElementById('theme-toggle').addEventListener('click', () => {
  const isDark = document.documentElement.classList.toggle('dark');
  const icon = document.getElementById('theme-icon');
  icon.setAttribute('data-lucide', isDark ? 'sun' : 'moon');
  createIcons({ icons: { Moon, Sun } });
  draw();
});

draw();
