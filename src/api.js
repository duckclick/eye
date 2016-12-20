import Mappersmith from 'mappersmith'

Mappersmith.Env.USE_PROMISES = true

const manifest = {
  host: '//localhost:7273',
  resources: {
    Wing: {
      trackDOM: { method: 'post', path: '/' }
    }
  },
  rules: [
    {
      values: {
        gateway: {withCredentials: true}
      }
    }
  ]
}

export default Mappersmith.forge(manifest)
