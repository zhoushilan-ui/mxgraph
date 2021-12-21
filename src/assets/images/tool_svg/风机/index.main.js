const req = require.context('./', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
export default {
    name: '风机',
    icon:requireAll(req)
}