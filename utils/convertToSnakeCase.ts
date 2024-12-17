type NestedObject = { [key: string]: any };

export default function convertToSnakeCase(obj: NestedObject): NestedObject {
  if (Array.isArray(obj)) {
    return obj.map((item) => convertToSnakeCase(item));
  } else if (typeof obj === 'object' && obj !== null) {
    const newObject: NestedObject = {};

    for (const key in obj) {
      const snakeCaseKey = key.replace(/[A-Z]/g, (char) => `_${char.toLowerCase()}`);

      newObject[snakeCaseKey] = convertToSnakeCase(obj[key]);
    }

    return newObject;
  }

  return obj;
}
