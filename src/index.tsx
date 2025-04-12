import React, {
	Ref,
	useRef,
	useEffect,
	RefCallback,
	cloneElement,
	ReactElement,
	HTMLAttributes,
	MutableRefObject,
	FunctionComponent
} from 'react';

type FocusEvents = 'focusin' | 'focusout';
type MouseEvents = 'click' | 'mousedown' | 'mouseup';
type TouchEvents = 'touchstart' | 'touchend';
type Events = FocusEvent | MouseEvent | TouchEvent;

interface Props extends HTMLAttributes<HTMLElement> {
	onClickAway: (event: Events) => void;
	focusEvent?: FocusEvents;
	mouseEvent?: MouseEvents;
	touchEvent?: TouchEvents;
	children: ReactElement<any>;
}

const eventTypeMapping = {
	click: 'onClick',
	focusin: 'onFocus',
	focusout: 'onBlur',
	mousedown: 'onMouseDown',
	mouseup: 'onMouseUp',
	touchstart: 'onTouchStart',
	touchend: 'onTouchEnd'
};

const reactMajorVersion = parseInt(React.version.split('.')[0], 10);

const mergeRefs = <T extends any>(
	refs: Array<Ref<T> | undefined | null>
): RefCallback<T> => {
	return (value) => {
		refs.forEach((ref) => {
			if (typeof ref === 'function') {
				ref(value);
			} else if (ref != null) {
				(ref as MutableRefObject<T | null>).current = value;
			}
		});
	};
};

const ClickAwayListener: FunctionComponent<Props> = ({
	children,
	onClickAway,
	focusEvent = 'focusin',
	mouseEvent = 'click',
	touchEvent = 'touchend',
	...rest
}) => {
	const node = useRef<HTMLElement | null>(null);
	const bubbledEventTarget = useRef<EventTarget | null>(null);
	const mountedRef = useRef(false);

	/**
	 * Prevents the bubbled event from getting triggered immediately
	 * https://github.com/facebook/react/issues/20074
	 */
	useEffect(() => {
		setTimeout(() => {
			mountedRef.current = true;
		}, 0);

		return () => {
			mountedRef.current = false;
		};
	}, []);

	const handleBubbledEvents =
		(type: string) =>
		(event: Events): void => {
			bubbledEventTarget.current = event.target;

			const handler = children?.props[type];

			if (handler) {
				handler(event);
			}
		};

	let childRef: React.Ref<any> | null = null;

	// For React 19+, we get the ref via props.ref
	if (reactMajorVersion >= 19) {
		childRef = children.props?.ref || null;
	} else if ('ref' in children) {
		childRef = (children as any).ref;
	}

	// Create a combined ref handler
	const combinedRef = mergeRefs([node, childRef]);

	useEffect(() => {
		const nodeDocument = node.current?.ownerDocument ?? document;

		const handleEvents = (event: Events): void => {
			if (!mountedRef.current) return;

			if (
				(node.current && node.current.contains(event.target as Node)) ||
				bubbledEventTarget.current === event.target ||
				!nodeDocument.contains(event.target as Node)
			) {
				return;
			}

			onClickAway(event);
		};

		nodeDocument.addEventListener(mouseEvent, handleEvents);
		nodeDocument.addEventListener(touchEvent, handleEvents);
		nodeDocument.addEventListener(focusEvent, handleEvents);

		return () => {
			nodeDocument.removeEventListener(mouseEvent, handleEvents);
			nodeDocument.removeEventListener(touchEvent, handleEvents);
			nodeDocument.removeEventListener(focusEvent, handleEvents);
		};
	}, [focusEvent, mouseEvent, onClickAway, touchEvent]);

	const mappedMouseEvent = eventTypeMapping[mouseEvent];
	const mappedTouchEvent = eventTypeMapping[touchEvent];
	const mappedFocusEvent = eventTypeMapping[focusEvent];

	return React.Children.only(
		cloneElement(children as ReactElement<any>, {
			ref: combinedRef,
			[mappedFocusEvent]: handleBubbledEvents(mappedFocusEvent),
			[mappedMouseEvent]: handleBubbledEvents(mappedMouseEvent),
			[mappedTouchEvent]: handleBubbledEvents(mappedTouchEvent),
			...rest
		})
	);
};

ClickAwayListener.displayName = 'ClickAwayListener';

export default ClickAwayListener;
