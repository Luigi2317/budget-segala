/* Service worker volontairement MINIMAL : il ne met plus rien en cache.

   Avant, il gardait une copie du site pour le mode hors-ligne — c'est ce qui provoquait
   les "chez moi ça marche, chez Maman non" : sa tablette continuait de servir une vieille
   copie pendant des jours. Maintenant que les données vivent dans le compte en ligne
   (et plus seulement dans le navigateur), le hors-ligne n'a plus de sens : mieux vaut
   zéro cache et toujours la bonne version.

   Il reste utile pour deux choses :
     - rendre l'application installable (l'icône sur l'écran d'accueil de la tablette) ;
     - purger les anciens caches laissés par les versions précédentes. */

const SW_VERSION = 'budget-segala-compte-v1';

self.addEventListener('install', () => {
  // ne pas attendre la fermeture des onglets : la nouvelle version prend la main tout de suite
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.map((k) => caches.delete(k)))) // purge TOUT l'ancien cache
      .then(() => self.clients.claim())
  );
});

/* Gestionnaire "fetch" présent mais volontairement passif : on laisse le navigateur aller
   au réseau normalement. Sa seule raison d'être est de satisfaire la condition d'installation
   de l'application. Ne jamais y remettre de mise en cache. */
self.addEventListener('fetch', () => {});
