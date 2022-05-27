import Home from '@page/Home.svelte';
import Skils from '@page/Skills.svelte';
import Projects from '@page/Projects.svelte';
import Experience from '@page/Experience.svelte';
import Contact from '@page/Contact.svelte';

export default {
  '/': Home,
  '/skills': Skils,
  '/projects': Projects,
  '/experience': Experience,
  '/contacts': Contact,
}
