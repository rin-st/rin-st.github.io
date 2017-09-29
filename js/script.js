$(function(){
  $('a[href^="#"]').on('click', function(event) {
    // �������� ����������� ��������
    event.preventDefault();

    var sc = $(this).attr("href"),
        dn = $(sc).offset().top;
    /*
    * sc - � ���������� ������� ���������� � ���, � ������ ����� ���� �������
    * dn - ���������� ��������� ����� �� ��������
    */

    $('html, body').animate({scrollTop: dn}, 300);

    /*
    * 1000 �������� �������� � �������������
    */
  });
});
