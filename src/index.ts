import axios from 'axios'
import { Config } from './common/constants/Config';
import { ListView } from './views/ListView'
import { EditView } from './views/EditView'

// axios default values
axios.defaults.baseURL = `${Config.domainUrl}${Config.documentsPath}`

// Views
new ListView().loadView()
new EditView().loadView()
