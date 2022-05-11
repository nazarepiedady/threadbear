import 'regenerator-runtime/runtime'

const load = async () => {
  const response = await fetch('https://threadbear.store')

  const text = await response.text()

  console.log(text)
}

load()
