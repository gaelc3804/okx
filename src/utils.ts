'use server'

export const getIpGeo = async (ip: string) => {
  const data = fetch(`http://ip-api.com/json/${ip}`).then(
    async (geoData) => {
      const { countryCode } = await geoData.json();

      return countryCode
    }
  );

  return data
}