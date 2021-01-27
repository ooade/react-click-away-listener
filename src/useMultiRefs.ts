import React from 'react';

const useMultiRefs = <T = any>(
	refs: Array<React.MutableRefObject<T> | React.LegacyRef<T>>
) => {
	return (value: any) => {
		refs.forEach((ref) => {
			if (typeof ref === 'function') {
				ref(value);
			} else if (ref != null) {
				(ref as React.MutableRefObject<T | null>).current = value;
			}
		});
	};
};

export { useMultiRefs };
