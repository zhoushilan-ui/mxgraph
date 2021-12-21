const req = require.context('./', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
export default {
    name: '电机',
    icon:requireAll(req)
}