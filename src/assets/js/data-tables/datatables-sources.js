
export function datatablessources(col){
    $(document).ready(function() {
        $('.sourced-data').DataTable( {
            language: {
                "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Vietnamese.json"
            },
            order: [[ col, 'desc' ]],
            pagingType: "full_numbers",
            stateSave: true,
            bDestroy: true,
            destroy: true
        } );
        
    } );
}

export function deleteRow(row){
    var tableselectionDelete = $('.sourced-data').DataTable();
    tableselectionDelete.destroy();
}

export function destroytable(){
    var table = $('.sourced-data').DataTable();
    table.destroy();

}


