import type {
  ApiContactProperty,
  ContactProperty,
} from '../../contact-properties/interfaces/contact-property';
import type {
  CreateContactPropertyApiOptions,
  CreateContactPropertyOptions,
} from '../../contact-properties/interfaces/create-contact-property-options.interface';
import type {
  UpdateContactPropertyApiOptions,
  UpdateContactPropertyOptions,
} from '../../contact-properties/interfaces/update-contact-property-options.interface';

export function parseContactPropertyFromApi(
  contactProperty: ApiContactProperty,
): ContactProperty {
  return {
    id: contactProperty.id,
    key: contactProperty.key,
    object: contactProperty.object,
    createdAt: contactProperty.created_at,
    type: contactProperty.type,
    fallbackValue: contactProperty.fallback_value,
  } as ContactProperty;
}

export function parseContactPropertyToApiOptions(
  contactProperty: CreateContactPropertyOptions | UpdateContactPropertyOptions,
): CreateContactPropertyApiOptions | UpdateContactPropertyApiOptions {
  if ('key' in contactProperty) {
    return {
      key: contactProperty.key,
      type: contactProperty.type,
      fallback_value: contactProperty.fallbackValue,
    };
  }
  return {
    fallback_value: contactProperty.fallbackValue,
  };
}
