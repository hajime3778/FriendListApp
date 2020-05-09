export class HttpUtil {

  /**
   * URLのクエリストリングを配列で取得します。
   */
  public static getUrlQueries() {
    var queryStr = window.location.search.slice(1);  // 文頭?を除外
    var queries: any = {}

    // クエリがない場合は空のオブジェクトを返す
    if (!queryStr) {
      return queries
    }

    // クエリ文字列を & で分割
    var keyAndValue = queryStr.split('&')

    for (const queryStr of keyAndValue) {
      // = で分割してkey,valueをオブジェクトに格納
      var queryArr = queryStr.split('=')
      queries[queryArr[0]] = queryArr[1]
    }

    return queries
  }
}