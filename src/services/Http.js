class HttpService{

  static async get(url){
    try {
      const res = await fetch(url);
      return res.json();
    } catch (error) {
      return {
        ok: false,
        message: error.message
      };
    }
  }


  static async post(url, data){
    try {
      const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data)
      });
      return res.json();
    } catch (error) {
      return {
        ok: false,
        message: error.message
      };
    }
  }

}