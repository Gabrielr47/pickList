(function ($) {

   $.fn.pickList = function (options) {

      var opts = $.extend({}, $.fn.pickList.defaults, options);

      this.fill = function () {
         var option = '';

         $.each(opts.data, function (key, val) {
            option += '<option data-id=' + val.id + '>' + val.text + '</option>';
         });
         this.find('.pickData').append(option);

         var result = '';
         $.each(opts.result, function (key, val) {
            result += '<option data-id=' + val.id + '>' + val.text + '</option>';
         });
         
         this.find('.pickListResult').append(result);
      };
      this.controll = function () {
         var pickThis = this;

         pickThis.find(".pAdd").on('click', function () {
            var p = pickThis.find(".pickData option:selected");
            p.clone().appendTo(pickThis.find(".pickListResult"));
            p.remove();
         });

         pickThis.find(".pAddAll").on('click', function () {
            var p = pickThis.find(".pickData option");
            p.clone().appendTo(pickThis.find(".pickListResult"));
            p.remove();
         });

         pickThis.find(".pRemove").on('click', function () {
            var p = pickThis.find(".pickListResult option:selected");
            p.clone().appendTo(pickThis.find(".pickData"));
            p.remove();
         });

         pickThis.find(".pRemoveAll").on('click', function () {
            var p = pickThis.find(".pickListResult option");
            p.clone().appendTo(pickThis.find(".pickData"));
            p.remove();
         });
      };

      this.getValues = function () {
         var objResult = [];
         this.find(".pickListResult option").each(function () {
            objResult.push({
               id: $(this).data('id'),
               text: this.text
            });
         });
         return objResult;
      };

      this.init = function () {

         opts.add = opts.btns.btnAdd ? opts.btns.btnAdd : opts.add;
         opts.addAll = opts.btns.btnAddAll ? opts.btns.btnAddAll : opts.addAll;
         opts.remove = opts.btns.btnRemove ? opts.btns.btnRemove : opts.remove;
         opts.removeAll = opts.btns.btnRemoveAll ? opts.btns.btnRemoveAll : opts.removeAll;

         var pickListHtml =
                 "<div class='row'>" +
                 "  <div class='col-sm-5'>" +
                 "	 <select class='form-control pickListSelect pickData' multiple></select>" +
                 " </div>" +
                 " <div class='col-sm-2 pickListButtons'>" +
                 "	<button  class='pAdd col-md-10 btn  btn-primary btn-sm '>" +  opts.add + "</button>" +
                 "   <button  class='pAddAll col-md-10 btn btn-primary btn-sm'>" + opts.addAll + "</button>" +
                 "	<button  class='pRemove col-md-10 btn btn-primary btn-sm'>" + opts.remove + "</button>" +
                 "	<button  class='pRemoveAll col-md-10 btn btn-primary btn-sm'>" + opts.removeAll + "</button>" +
                 " </div>" +
                 " <div class='col-sm-5'>" +
                 "    <select class='form-control pickListSelect pickListResult' multiple></select>" +
                 " </div>" +
                 "</div>";

         this.append(pickListHtml);

         this.fill();
         this.controll();
      };

      this.init();
      return this;
   };
   var opts = $.fn.pickList;
   $.fn.pickList.defaults = {
      add:'Agregar' ,
      addAll: 'Agregar todo',
      remove: 'Remover',
      removeAll: 'Remover todo'
   };
  


}(jQuery));
