//roll carousel 
const roles = [
  'Software Engineer',
  'Data Scientist',
  'AI Engineer',
  'CS Graduate'
];
let roleIdx = 0, charIdx = 0, deleting = false;
const el = document.getElementById('role-text');

function type() {
  const current = roles[roleIdx];
  const cursor = '<span class="cursor"></span>';
  if (!deleting) {
    charIdx++;
    el.innerHTML = current.slice(0, charIdx) + cursor;
    if (charIdx === current.length) {
      deleting = true;
      setTimeout(type, 1800);
      return;
    }
  } else {
    charIdx--;
    el.innerHTML = current.slice(0, charIdx) + cursor;
    if (charIdx === 0) {
      deleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      setTimeout(type, 300);
      return;
    }
  }
  setTimeout(type, deleting ? 45 : 80);
}

setTimeout(type, 1200);

//triggered fade-in
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.project-card, .fact-item, .skill-group-label, .about-bio').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(16px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});
