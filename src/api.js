import Mappersmith from 'mappersmith'

Mappersmith.Env.USE_PROMISES = true

const manifest = {
  host: 'http://localhost:7273',
  resources: {
    Wing: {
      trackDOM: { method: 'post', path: '/' }
    }
  }
}

export default Mappersmith.forge(manifest)
