// API types
type StringBaseApiContactProperty = {
  type: 'string';
  fallback_value: string | null;
};

type NumberBaseApiContactProperty = {
  type: 'number';
  fallback_value: number | null;
};

export type ApiContactProperty = {
  id: string;
  object: 'contact_property';
  created_at: string;
  key: string;
} & (StringBaseApiContactProperty | NumberBaseApiContactProperty);

// SDK types
type StringBaseContactProperty = {
  type: 'string';
  fallbackValue: string | null;
};

type NumberBaseContactProperty = {
  type: 'number';
  fallbackValue: number | null;
};

export type ContactProperty = {
  id: string;
  object: 'contact_property';
  createdAt: string;
  key: string;
} & (StringBaseContactProperty | NumberBaseContactProperty);
