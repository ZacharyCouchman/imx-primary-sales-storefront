import config, { applicationEnvironment } from "../config/config";
import { SimplifiedProduct } from "../types/type";

export async function getSimplifiedProducts(): Promise<SimplifiedProduct[]> {
  const products: SimplifiedProduct[] = await (
    await fetch(`${config[applicationEnvironment].primarySaleBackendUrl}/${config[applicationEnvironment].hubEnvironmentId}/products`, {
      method: 'GET'
    })
  ).json();

  return products as SimplifiedProduct[];
}