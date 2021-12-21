const req = require.context('./', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
export default {
    name: '仪表',
    icon:requireAll(req)
}