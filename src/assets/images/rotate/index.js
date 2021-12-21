const req = require.context('./', false, /\.png$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
export default requireAll(req)
