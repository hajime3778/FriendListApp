import { Config } from '../common/constants/Config';

export class FirebaseModel {

  documentsPath: string = ""

  constructor() { }

  /** 
   * Firebase追加時の型にキャストする
   * @param  {any} model
   * @returns any
   */
  protected toRegistModel(model: any): any {

    var firebaseRegistModel: { fields: any } = { fields: {} }

    for (const key in model) {
      if (key != 'documentPath' && model.hasOwnProperty(key)) {
        var fields = firebaseRegistModel.fields
        fields[key] = { stringValue: model[key] }
      }
    }

    return firebaseRegistModel
  }

  /** 
   * Firebase更新時の型にキャストする
   * @param  {any} model
   * @returns any
   */
  protected toUpdateModel(model: any): any {

    var firebaseUpdateModel: {
      writes: [{
        updateMask: {
          fieldPaths: string[]
        },
        update: {
          name: string,
          fields: any
        }
      }]
    } = {
      writes: [{
        updateMask: {
          fieldPaths: []
        },
        update: {
          name: '',
          fields: {}
        }
      }]
    }

    var updateMask = firebaseUpdateModel.writes[0].updateMask
    var update = firebaseUpdateModel.writes[0].update

    update.name = this.documentsPath

    for (const key in model) {
      if (key != 'documentPath' && model.hasOwnProperty(key)) {
        updateMask.fieldPaths.push(key)
        update.fields[key] = { stringValue: model[key] }
      }
    }


    const hoge = {
      writes: [
        {
          updateMask: {
            fieldPaths: [
              "name",
              "favorite"
            ]
          },
          update: {
            name: "projects/YOUR_PROJECT_ID/databases/(default)/documents/users/2zvC6qdeajc4rzvMdvwv",
            fields: {
              name: {
                stringValue: "update-test"
              },
              favorite: {
                stringValue: "foo bar"
              }
            }
          }
        }
      ]
    }
    console.log(hoge)
    console.log(firebaseUpdateModel)

    return firebaseUpdateModel
  }

}