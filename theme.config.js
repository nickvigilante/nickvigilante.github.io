const YEAR = new Date().getFullYear()

export default {
  footer: (
    <footer>
      <small>
        <time>{YEAR}</time> © Nick Vigilante.
      </small>
      <style jsx>{`
        footer {
          margin-top: 8rem;
        }
      `}</style>
    </footer>
  ),
  darkMode: true,
  navs: [
    {
      url: 'https://github.com/nickvigilante',
      name: 'GitHub'
    },
    {
      url: 'https://www.linkedin.com/in/n-i-c-k-v/',
      name: 'LinkedIn'
    }
  ],
}
