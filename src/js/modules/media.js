const settings = {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 1024,
    xl: 1200
}

const eventSet = {
    to: function() {},
    from: function() {}
}

export class Media {
    constructor( params = {} ) {
        this.options = Object.assign( {}, settings );
        this.options = Object.assign( this.options, params );
    }

    mediaQueryEvent( query, eventsParams = {} ) {
        let events = Object.assign( {}, eventSet );
        events = Object.assign( events, eventsParams );

        const breakpoint = window.matchMedia( query );

        function eventsFunc() {
            if ( breakpoint.matches ) {
                events.to();
            } else {
                events.from();
            }
        }
        eventsFunc()
        
        breakpoint.addEventListener( 'change', function(e) {
            eventsFunc()
        });

        return breakpoint.matches;
    }

    init( params = {} ) {
        const context = this;
        let options = Object.assign( {}, this.options );
        options = Object.assign( options, params );

        Object.keys( options ).forEach( function( key ) {
            const query = `(min-width: ${ options[key] }px)`;

            context[key] = function( eventsParams = {} ) {
                return context.mediaQueryEvent( query, eventsParams )
            }
        })
    }

    query( query, eventsParams = {} ) {
        return this.mediaQueryEvent( query, eventsParams )
    }
}
