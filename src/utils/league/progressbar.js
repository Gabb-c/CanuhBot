async function progressBar(value) {
    const maxValue = 10;
    const size = 10;
    const percentage = value / maxValue;
    const progress = Math.round((size * percentage));
    const emptyProgress = size - progress;
  
    const progressText = '▇'.repeat(progress);
    const emptyProgressText = '—'.repeat(emptyProgress);
  
    const bar = '```[' + progressText + emptyProgressText + ']' + '```'; // Creating the bar
    return bar;
}

module.exports = { progressBar };